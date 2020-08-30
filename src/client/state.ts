import { configureStore, createSlice } from "@reduxjs/toolkit";

// state to keep track of:
//    mouse position
//    whether drawing is enabled
//    whether we started drawing
//    whether drawing is stopped (i guess that's the same as the inverse of whether we started drawing)

export interface State {
  // mouseX: number;
  // mouseY: number;
  isDrawEnabled: boolean;
  hasDrawStarted: boolean;
}

const initialState: State = {
  // mouseX: -1,
  // mouseY: -1,
  isDrawEnabled: false,
  hasDrawStarted: false,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // setMousePosition: {
    //   reducer(state, action: PayloadAction<{ x: number; y: number }>) {
    //     state.mouseX = action.payload.x;
    //     state.mouseY = action.payload.y;
    //   },
    //   prepare({ x, y }: { x: number; y: number }) {
    //     return { payload: { x, y } };
    //   },
    // },

    setDrawEnabled: (state, action) => {
      state.isDrawEnabled = action.payload;
    },

    setDrawStarted: (state, action) => {
      state.hasDrawStarted = action.payload;
    },
  },
});

export const store = configureStore({ reducer: stateSlice.reducer });

export const { actions } = stateSlice;
