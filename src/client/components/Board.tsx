import React from "react";
import { useSelector } from "react-redux";
import "twin.macro";
import { draw, newStroke } from "../draw";
import { actions, State, store } from "../state";
import { ws } from "../websocket";

/**
 * The canvas board where drawing takes place. Though this component does have mouse event callbacks, lines can only be drawn if Drawing Mode is enabled. For this reason, this component should not be included directly. Rather, BoardWithDrawingMode should be used instead.
 */
export const Board = React.forwardRef<HTMLCanvasElement>((_props, ref) => {
  const isDrawEnabled = useSelector((state: State) => state.isDrawEnabled);
  const hasDrawStarted = useSelector((state: State) => state.hasDrawStarted);
  const { windowHeight, windowWidth } = useSelector((state: State) => {
    const { windowHeight, windowWidth } = state;
    return { windowHeight, windowWidth };
  });

  function onMouseMoveHandler(e: React.MouseEvent<HTMLCanvasElement>) {
    if (isDrawEnabled) {
      const canvas = e.currentTarget;
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      if (!hasDrawStarted) {
        // initiate the start of a new canvas path/line.
        newStroke(ctx, x, y);

        store.dispatch(actions.setDrawStarted(true));

        ws.send(
          JSON.stringify({
            type: "start",
            x,
            y,
          }),
        );
      }

      // smooth drawing
      window.requestAnimationFrame(() => {
        draw(ctx, x, y);

        // TODO: future optimization: batch all strokes until current draw has finished, then send the batched strokes.
        // TODO: could just send text separated by delimiters. would probably be faster than encoding/decoding json.

        // send drawing data to others connected to server.
        ws.send(
          JSON.stringify({
            type: "draw",
            x,
            y,
          }),
        );
      });
    } else if (hasDrawStarted) {
      // finish drawing
      store.dispatch(actions.setDrawStarted(false));

      ws.send(
        JSON.stringify({
          type: "stop",
        }),
      );
    }
  }

  return (
    <canvas
      height={windowHeight}
      width={windowWidth}
      onMouseMove={onMouseMoveHandler}
      ref={ref}
      tw="fixed inset-0"
    ></canvas>
  );
});

Board.displayName = "ForwardRef(Board)";
