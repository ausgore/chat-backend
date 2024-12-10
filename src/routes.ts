import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import maslow from "./maslow";
import { Message, NEEDS } from "./types";

const routes: FastifyPluginAsyncTypebox = async (app) => {
	app.get('/start', async (req, res) => {
		return maslow.start();
	});

	app.post<{
		Body: {
			content: string;
			history: Message[];
			need: NEEDS;
		}
	}>('/reply', async (req, res) => {
		return maslow.reply(req.body.content, req.body.history, req.body.need);
	});
}

export default routes;