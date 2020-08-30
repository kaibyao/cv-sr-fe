import { MutableRefObject, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { actions, State, store } from "./state";

/**
 * Initiates window event tracking so that certain hotkeys will enable drawing or clear the board.
 *
 * @export
 * @returns {MutableRefObject<HTMLCanvasElement>}
 */
export function withCanvasEventsRef(): MutableRefObject<HTMLCanvasElement> {
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
            ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    let rafId;
    function saveWithRefreshRate() {
      rafId = window.requestAnimationFrame(saveNewDimensions);
    }

    window.addEventListener("resize", saveWithRefreshRate);
    return () => {
      window.removeEventListener("resize", saveWithRefreshRate);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [windowHeight, windowWidth]);

  return canvasRef;
}
