import { configureStore } from "@reduxjs/toolkit";
import { composeReducer, uiReducer, userReducer } from "../slices";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    compose: composeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
