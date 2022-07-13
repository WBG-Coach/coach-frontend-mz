import { RootState } from "..";
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: { id?: number } = {};

const guideSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    openGuide: (_state, action) => ({
      id: action.payload,
    }),
    closeGuide: () => INITIAL_STATE,
  },
});

export const selectGuide = (state: RootState): { id?: number } => state.guide;

export const { closeGuide, openGuide } = guideSlice.actions;

const { reducer } = guideSlice;

export default reducer;
