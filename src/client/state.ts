import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// state to keep track of:
//    mouse position
//    whether drawing is enabled
//    whether we started drawing
//    whether drawing is stopped (i guess that's the same as the inverse of whether we started drawing)

export interface State {
  isDrawEnabled: boolean;
  hasDrawStarted: boolean;
  windowHeight: number;
  windowWidth: number;
}

const initialState: State = {
  isDrawEnabled: false,
  hasDrawStarted: false,
  windowHeight: window.innerHeight,
  windowWidth: window.innerWidth,
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    saveWindowDimensions: {
      reducer(state, action: PayloadAction<{ w: number; h: number }>) {
        state.windowWidth = action.payload.w;
        state.windowHeight = action.payload.h;
      },
      prepare({ w, h }: { w: number; h: number }) {
        return { payload: { w, h } };
      },
    },

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
