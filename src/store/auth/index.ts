import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { setLocalUser } from "../../localStorage";
import { api } from "../../service";
import { User } from "../type";

const INITIAL_STATE: User = {};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loadLocalUser: (_state, action) => {
      return action.payload;
    },
    selectSchool: (state, action) => {
      const newState = { ...state, selectedSchool: action.payload };
      setLocalUser(newState);
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      setLocalUser(action.payload);
      return { ...state, ...action.payload };
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const { selectSchool, loadLocalUser } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
