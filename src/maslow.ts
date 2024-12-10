import OpenAI from "openai";
import dotenv from "dotenv";
import random from "random";
import { titleize } from "inflection";
import { Message, NEEDS } from "./types";

dotenv.config();

class Maslow {
	private model: string = 'gpt-4o-mini';
	private openai: OpenAI = new OpenAI({
		apiKey: process.env.APIKEY
	});

	async start() {
		const needs = Object.values(NEEDS).filter(v => typeof v == 'number');
		const need = random.choice(needs)!;

		const response = await this.openai.chat.completions.create({
			model: this.model,
			messages: [{
				role: 'system',
				content: `This is a conversation simulation between student and lecturer. You are a student, and I am the lecturer. You will need to simulate a conversation as a student, and I will be tasked to guess your needs. We will use the 7 needs of Maslow: Biological and Physiological, Safety, Love and belonging, Esteem, Cognitive, Aesthetic, Self-actualisation, transcendence. You, as the student, may preferably address me as 'Cher' which is the short form for Lecturer, or my name if I provide it. You, as a student, must speak in Singlish (Singaporean English), minus the foul language. When I start the conversation with 'STARTSIMULATION', you will behave as a student who has the need of ${titleize(NEEDS[need])}. When I say 'MASLOWAISTOP' and follow up with the guess of the Maslow need, you will analyse my guess and let me know if it's correct by replying with a sentence that starts with (BOOLEAN) where the answer is whether it's true or false.`
			}, { role: 'user', content: 'STARTSIMULATION' }]
		});

		return {
			need: NEEDS,
			message: {
				role: response.choices[0].message.role,
				content: response.choices[0].message.content
			}
		};
	}

	reply(content: string, history: Message[], need: NEEDS) {
		return this.openai.chat.completions.create({
			model: this.model,
			messages: [{
				role: 'system',
				content: `This is a conversation simulation between student and lecturer. You are a student, and I am the lecturer. You will need to simulate a conversation as a student, and I will be tasked to guess your needs. We will use the 7 needs of Maslow: Biological and Physiological, Safety, Love and belonging, Esteem, Cognitive, Aesthetic, Self-actualisation, transcendence. You, as the student, may preferably address me as 'Cher' which is the short form for Lecturer, or my name if I provide it. You, as a student, must speak in Singlish (Singaporean English), minus the foul language. When I start the conversation with 'STARTSIMULATION', you will behave as a student who has the need of ${titleize(NEEDS[need])}. When I say 'MASLOWAISTOP' and follow up with the guess of the Maslow need, you will analyse my guess and let me know if it's correct by replying with a sentence that starts with (BOOLEAN) where the answer is whether it's true or false.`
			}, ...history, { role: 'user', content }]
		});
	}
}

export default new Maslow;
