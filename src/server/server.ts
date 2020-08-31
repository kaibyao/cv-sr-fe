import fastify from "fastify";
import { OPEN, Server } from "ws";
import { routes } from "./routes";

// websocket server
const wss = new Server({ port: 9001 });

wss.on("connection", function connection(ws /*, req*/) {
  console.log(`Connection started.`);

  ws.on("message", function incoming(data) {
    // console.log(`Received: ${data}`);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === OPEN) {
        // console.log(`Sending: ${data}`);
        client.send(data);
      }
    });
  });
});

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
