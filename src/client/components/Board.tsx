import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "twin.macro";
import { actions, State, store } from "../state";

export function Board(): React.ReactElement {
  const isDrawEnabled = useSelector((state: State) => state.isDrawEnabled);
  const hasDrawStarted = useSelector((state: State) => state.hasDrawStarted);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function toggleDrawingMode(e: KeyboardEvent): void {
      if (e.keyCode === 68) {
        store.dispatch(actions.setDrawEnabled(!isDrawEnabled));
      }
    }

    window.addEventListener("keydown", toggleDrawingMode);
    return () => {
      window.removeEventListener("keydown", toggleDrawingMode);
    };
  }, [isDrawEnabled]);

  useEffect(() => {
    function saveNewDimensions(): void {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }

    // todo: optimize
    window.addEventListener("resize", saveNewDimensions);
    return () => {
      window.removeEventListener("resize", saveNewDimensions);
    };
  }, [windowHeight, windowWidth]);

  const canvasRef = useRef(null);

  function onMouseMoveHandler(e: React.MouseEvent) {
    // always save the last known coordinates of the mouse
    const canvas = canvasRef.current;
    const { left, top } = canvas.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

    if (isDrawEnabled) {
      if (!hasDrawStarted) {
        ctx.moveTo(x, y);
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";

        store.dispatch(actions.setDrawStarted(true));
      }

      // draw
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (hasDrawStarted) {
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
