import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import maslow from "./maslow";

const routes: FastifyPluginAsyncTypebox = async (app) => {
	app.get('/start', async (req, res) => {
		return maslow.start();
	});

	app.get('/reply', async (req, res) => {

	});
}

export default routes;