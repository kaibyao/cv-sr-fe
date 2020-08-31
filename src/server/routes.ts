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
          <link href="https://fonts.googleapis.com/css2?family=Lato&family=Rock+Salt&display=swap" rel="stylesheet">
          <style>
            /* copied from GlobalCss.tsx */
            html,
            body,
            #app {
              height: 100%;
            }

            body {
              margin: 0;
              padding: 0;

              color: #fff;
              font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI",
                Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
                "Segoe UI Emoji", "Segoe UI Symbol";
              font-size: 16px;
              line-height: 1.4;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;

              background-color: #26292e;
            }

            /* canvas */
            .canvas--observer {
              position: fixed;
              top: 0; right: 0; bottom: 0; left: 0;
            }
          </style>
        </head>
        <body>
          <div id="app"></div>
          <script src="http://localhost:8080/observer.js"></script>
        </body>
    </html>`);
  });
}
