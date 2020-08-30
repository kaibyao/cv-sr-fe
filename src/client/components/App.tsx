import { css } from "@emotion/core";
import React from "react";
import { hot } from "react-hot-loader/root";
import "twin.macro";
import { Board } from "./Board";
import { GlobalCss } from "./GlobalCss";

function AppCore(): JSX.Element {
  return (
    <>
      <GlobalCss />
      <Board />
      <h1
        tw="text-4xl pt-4 ml-4 mb-4 pointer-events-none select-none"
        css={css`
          font-family: "Rock Salt";
        `}
      >
        Graffiti
      </h1>
      <div
        className="subtitle"
        tw="ml-4 text-xl pointer-events-none select-none"
      >
        Press ‘D’ to start drawing. Press ‘D’ again to stop.
      </div>
    </>
  );
}

export const App = hot(AppCore);
