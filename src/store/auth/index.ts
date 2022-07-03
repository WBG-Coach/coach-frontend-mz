import { RootState } from "..";
import { api } from "../../service";
import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, setLocalUser } from "../../storage";
import { User } from "../type";

const INITIAL_STATE: User & { loginError?: string } = {};

const MOCK: any = {
  id: 2,
  name: "Marcos Soledade",
  email: "user2@email.com",
  profile_id: 2,
  updated_at: "2022-07-02T22:12:47.000000Z",
  image_url:
    "http://www.lamedichi.info/wp-content/uploads/2020/12/TAW9U8HJ5-UAW9UCKMX-e8b2706043e3-512.jpeg",
};

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
      if (action.payload) {
        setLocalUser({
          ...MOCK,
          ...action.payload,
        });
        return { ...state, ...action.payload };
      } else {
        return { ...state, loginError: "login-error" };
      }
    });
  },
});

export const selectCurrentUser = (state: RootState) => state.auth;

export const selectLoginErrorMessage = (state: RootState) =>
  state.auth.loginError;

export const { selectSchool, loadLocalUser, logout } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
