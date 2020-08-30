import { css, Global } from "@emotion/core";
import React from "react";
import "twin.macro";

export function GlobalCss(): React.ReactElement {
  return (
    <Global
      styles={css`
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
      `}
    />
  );
}
