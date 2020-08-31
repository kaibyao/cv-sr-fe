import { clear, draw, newStroke } from "./draw";
import { ws } from "./websocket";

const canvasEl = document.createElement("canvas");
canvasEl.className = "canvas--observer";
canvasEl.height = window.innerHeight;
canvasEl.width = window.innerWidth;

document.getElementById("app").appendChild(canvasEl);

const ctx: CanvasRenderingContext2D = canvasEl.getContext("2d");

// websocket: copy all actions made by the artist.
ws.onmessage = (e) => {
  const { type: messageType, x, y } = JSON.parse(e.data);

  switch (messageType) {
    case "start":
      newStroke(ctx, x, y);
      break;
    case "draw":
      draw(ctx, x, y);
      break;
    case "clear":
      clear(ctx, canvasEl.width, canvasEl.height);
      break;
    case "stop":
      break;
    default:
      break;
  }
};

window.addEventListener("resize", () => {
  window.requestAnimationFrame(() => {
    canvasEl.height = window.innerHeight;
    canvasEl.width = window.innerWidth;
  });
});
