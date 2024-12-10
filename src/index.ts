import cors from "@fastify/cors";
import { TypeBoxValidatorCompiler } from "@fastify/type-provider-typebox";
import fastify from "fastify";
import routes from "./routes";

const bootstrap = async (port: number = 8080) => {
	const app = fastify().setValidatorCompiler(TypeBoxValidatorCompiler);
	app.register(cors, { origin: '*' });
	app.register(routes);

	app.listen({ port }, (err, address) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}
		console.log(`Server listening at ${address}`);
	});
}

bootstrap();