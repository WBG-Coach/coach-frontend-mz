import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { api } from "../../service";
import { User } from "../type";

const INITIAL_STATE: User = {};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    selectSchool: (state, action) => {
      return { ...state, selectedSchool: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const { selectSchool } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
