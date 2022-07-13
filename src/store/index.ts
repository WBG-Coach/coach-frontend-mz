import { configureStore } from "@reduxjs/toolkit";
import guideReducer from "./guide";
import authReducer from "./auth";
import { api } from "../service";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: { guide: guideReducer, auth: authReducer, api: api.reducer },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(api.middleware),
  ],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
