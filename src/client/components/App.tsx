import React from "react";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import "twin.macro";
import { store } from "../state";
import { Board } from "./Board";
import { GlobalCss } from "./GlobalCss";
import { Title } from "./Title";

function AppCore(): JSX.Element {
  return (
    <Provider store={store}>
      <GlobalCss />

      <Board />

      <Title />
    </Provider>
  );
}

export const App = hot(AppCore);
