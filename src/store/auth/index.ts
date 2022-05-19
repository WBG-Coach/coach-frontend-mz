import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const authSlice = createSlice({
  name: "counter",
  initialState: {
    user: undefined,
  },
  reducers: {
    login: (state): any => {
      return {
        ...state,
        user: {
          name: "Coach name",
        },
      };
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { login } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
