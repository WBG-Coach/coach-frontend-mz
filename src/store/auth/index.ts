import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const authSlice = createSlice({
  name: "counter",
  initialState: {
    user: undefined,
    profileImage: "",
  },
  reducers: {
    login: (state): any => {
      return {
        ...state,
        user: {
          name: "Coach name",
          profileImage:
            "https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png",
        },
      };
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export const { login } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
