import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import "twin.macro";
import { store } from "../state";
import { BoardWithDrawingMode } from "./BoardWithDrawingMode";
import { GlobalCss } from "./GlobalCss";
import { Title } from "./Title";

function AppCore(): JSX.Element {
  return (
    <Provider store={store}>
      <GlobalCss />

      <BoardWithDrawingMode />

      <Title />
    </Provider>
  );
}

export const App = hot(AppCore);
