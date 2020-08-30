import { css } from "@emotion/core";
import React from "react";
import { useSelector } from "react-redux";
import "twin.macro";

export function Title(): React.ReactElement {
  const isDrawingModeEnabled = useSelector((state) => state.isDrawEnabled);

  return (
    <div
      className="titles"
      tw="transition-opacity duration-150 pointer-events-none select-none"
      css={
        isDrawingModeEnabled
          ? css`
              opacity: 0;
            `
          : ""
      }
    >
      <h1
        tw="text-4xl pt-4 ml-4 mb-4"
        css={css`
          font-family: "Rock Salt";
        `}
      >
        Graffiti
      </h1>
      <div className="subtitle" tw="ml-4 text-xl">
        Press ‘D’ to start drawing. Press ‘D’ again to stop.
        <br />
        Press ‘C’ to clear the board when not drawing.
      </div>
    </div>
  );
}
