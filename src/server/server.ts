import fastify from "fastify";
import { routes } from "./routes";

const app = fastify({ logger: true });
app.register(routes);

const start = async () => {
  try {
    await app.listen(3000);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
