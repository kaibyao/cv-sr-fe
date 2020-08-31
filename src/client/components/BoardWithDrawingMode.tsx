import debounce from "lodash/debounce";
import React, { MutableRefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { clear } from "../draw";
import { actions, State, store } from "../state";
import { ws } from "../websocket";
import { Board } from "./Board";

/**
 * HOC that wraps <Board /> with window event listeners.
 */
export function BoardWithDrawingMode(): JSX.Element {
  const canvasRef: MutableRefObject<HTMLCanvasElement> = useRef(null);

  const isDrawEnabled = useSelector((state: State) => state.isDrawEnabled);
  const { windowHeight, windowWidth } = useSelector((state: State) => {
    const { windowHeight, windowWidth } = state;
    return { windowHeight, windowWidth };
  });

  useEffect(() => {
    function toggleDrawingMode(e: KeyboardEvent): void {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      switch (e.keyCode) {
        case 67: // C
          if (!isDrawEnabled) {
            clear(ctx, canvas.width, canvas.height);
            ws.send(
              JSON.stringify({
                type: "clear",
              }),
            );
          }
          break;
        case 68: // D
          store.dispatch(actions.setDrawEnabled(!isDrawEnabled));
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", toggleDrawingMode);
    return () => {
      window.removeEventListener("keydown", toggleDrawingMode);
    };
  }, [isDrawEnabled]);

  useEffect(() => {
    function saveNewDimensions(): void {
      store.dispatch(
        actions.saveWindowDimensions({
          w: window.innerWidth,
          h: window.innerHeight,
        }),
      );
    }

    // so we aren't causing unnecessary jank when resizing
    const debouncedSave = debounce(saveNewDimensions, 200);

    window.addEventListener("resize", debouncedSave);
    return () => {
      window.removeEventListener("resize", debouncedSave);
    };
  }, [windowHeight, windowWidth]);

  return <Board ref={canvasRef} />;
}
