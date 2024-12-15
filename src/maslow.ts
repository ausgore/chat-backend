import OpenAI from "openai";
import dotenv from "dotenv";
import random from "random";
import { titleize } from "inflection";
import { Message, NEEDS } from "./types";
import config from "./config";

dotenv.config();

class Maslow {
	private model: string = 'gpt-4o-mini';
	private openai: OpenAI = new OpenAI({
		apiKey: process.env.APIKEY
	});

	async start(content: string) {
		const needs = Object.values(NEEDS).filter(v => typeof v == 'number');
		const need = random.choice(needs)!;

		const response = await this.openai.chat.completions.create({
			model: this.model,
			messages: [{
				role: 'system',
				content: config.instruction_1.replace(/$NEED/g, titleize(NEEDS[need]))
			}, { role: 'user',  content }]
		});

		return {
			need,
			message: {
				role: response.choices[0].message.role,
				content: response.choices[0].message.content!
			}
		}
	}

	async reply(content: string, history: Message[], need: NEEDS) {
		const response = await this.openai.chat.completions.create({
			model: this.model,
			messages: [{
				role: 'system',
				content: config.instruction_1.replace(/$NEED/g, titleize(NEEDS[need]))
			}, ...history, { role: 'user', content }]
		});

		return {
			role: response.choices[0].message.role,
			content: response.choices[0].message.content
		}
	}

	async analyse(content: string, history: Message[], need: NEEDS) {
		const response = await this.openai.chat.completions.create({
			model: this.model,
			messages: [{
				role: 'system',
				content: `${config.instruction_2}\nUse a clear and reader-friendly html format with headings or sections if appropriate, assume that your parent element is already a <p>.`.replace(/$NEED/g, titleize(NEEDS[need]))
			}, {
				name: 'process_conversation',
				role: 'function',
				content: JSON.stringify(history)
			}, { role: 'user', content }]
		});

		return response.choices[0].message.content;
	}
}

export default new Maslow;
