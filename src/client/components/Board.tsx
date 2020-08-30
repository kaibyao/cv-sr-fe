import React from "react";
import { useSelector } from "react-redux";
import "twin.macro";
import { actions, State, store } from "../state";
import { withCanvasEventsRef } from "../withWindowEvents";

export function Board(): React.ReactElement {
  const isDrawEnabled = useSelector((state: State) => state.isDrawEnabled);
  const hasDrawStarted = useSelector((state: State) => state.hasDrawStarted);
  const { windowHeight, windowWidth } = useSelector((state: State) => {
    const { windowHeight, windowWidth } = state;
    return { windowHeight, windowWidth };
  });

  // initiates window event tracking
  const canvasRef = withCanvasEventsRef();

  function onMouseMoveHandler(e: React.MouseEvent) {
    if (isDrawEnabled) {
      const canvas = canvasRef.current;
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

      if (!hasDrawStarted) {
        // initiate the start of a new canvas path/line.
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.lineCap = "round"; // smooth lines
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#4bd1c4";

        store.dispatch(actions.setDrawStarted(true));
      }

      // draw
      window.requestAnimationFrame(() => {
        ctx.lineTo(x, y);
        ctx.stroke();
      });
    } else if (hasDrawStarted) {
      // finish drawing
      store.dispatch(actions.setDrawStarted(false));
    }
  }

  return (
    <canvas
      height={windowHeight}
      width={windowWidth}
      onMouseMove={onMouseMoveHandler}
      ref={canvasRef}
      tw="fixed inset-0"
    ></canvas>
  );
}
