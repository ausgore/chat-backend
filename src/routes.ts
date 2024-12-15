import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import maslow from "./maslow";
import { Message, NEEDS } from "./types";

const routes: FastifyPluginAsyncTypebox = async (app) => {
	app.post<{
		Body: {
			content: string;
		}
	}>('/start', async (req, res) => {
		return maslow.start(req.body.content);
	});

	app.post<{
		Body: {
			need: NEEDS;
			content: string;
			history: Message[];
		}
	}>('/reply', async (req, res) => {
		return maslow.reply(req.body.content, req.body.history, req.body.need);
	});

	app.post<{
		Body: {
			need: NEEDS;
			content: string;
			history: Message[];
		},
	}>('/analyse', async (req, res) => {
		return maslow.analyse(req.body.content, req.body.history, req.body.need);
	});
}

export default routes;