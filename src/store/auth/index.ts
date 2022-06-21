import { RootState } from "..";
import { api } from "../../service";
import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, setLocalUser } from "../../storage";
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
    logout: () => {
      clearLocalStorage();
      setLocalUser(INITIAL_STATE);
      return INITIAL_STATE;
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

export const { selectSchool, loadLocalUser, logout } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
