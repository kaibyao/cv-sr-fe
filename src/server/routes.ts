import { FastifyInstance } from "fastify";

export async function routes(
  fastify: FastifyInstance /*, opts*/,
): Promise<void> {
  fastify.get("/", async (_request, reply) => {
    reply.header("Content-Type", "text/html").send(`
    <html>
        <head>
          <title>Graffiti: Draw</title>
          <link href="https://fonts.googleapis.com/css2?family=Lato&family=Rock+Salt&display=swap" rel="stylesheet">
        </head>
        <body>
          <div id="app"></div>
          <script src="http://localhost:8080/app.js"></script>
        </body>
    </html>`);
  });

  fastify.get("/observer", async (_request, reply) => {
    reply.header("Content-Type", "text/html").send(`
    <html>
        <head>
          <title>Graffiti: Observer</title>
        </head>
        <body>
          <div id="app"></div>
        </body>
    </html>`);
  });
}
