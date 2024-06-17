import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { uiManagerSlice } from "./features/ui/uiManagerSlice";
import { authSlice } from "./features/authentication/authSlice";
import { letterSlice } from "./features/letter/letterSlice";
import { workflowSlice } from "./features/letter/workflow/workflowSlice";
import { contactSlice } from "./features/contact/contactSlice";

const rootReducer = combineSlices(
  uiManagerSlice,
  authSlice,
  letterSlice,
  workflowSlice,
  contactSlice
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
