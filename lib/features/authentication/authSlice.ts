import { createAppSlice } from "@/lib/createAppSlice";
import { IMe, ICredentials } from "@/typing/interface";
import { RequestStatusEnum } from "@/typing/enum";
import {
  get_authentication_token,
  delete_authentication_token,
} from "./actions";
import { toast } from "sonner";
import { PayloadAction } from "@reduxjs/toolkit";
export interface IAuthSliceState {
  me: IMe;
  is_authenticated: boolean;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: IAuthSliceState = {
  me: {} as IMe,
  is_authenticated: false,
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const authSlice = createAppSlice({
  name: "authentication",
  initialState,

  reducers: (create) => ({
    login: create.asyncThunk(
      async (credentials: ICredentials) => {
        const response = await get_authentication_token(credentials);
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.loading("Logging in, please wait...");
        },
        fulfilled: (state, action: PayloadAction<IMe>) => {
          state.status = RequestStatusEnum.IDLE;
          state.is_authenticated = true;
          state.me = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Welcome back! You have successfully logged in.");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to login";
          state.is_authenticated = false;
          toast.dismiss();
          toast.error(action.error.message || "Failed to login");
        },
      }
    ),
    logout: create.asyncThunk(
      async () => {
        const response = await delete_authentication_token();
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
        },
        fulfilled: (state) => {
          state.status = RequestStatusEnum.IDLE;
          state.is_authenticated = false;
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to login";
        },
      }
    ),
  }),

  selectors: {
    selectMe: (authentication) => authentication.me,
    selectIsAuthenticated: (authentication) => authentication.is_authenticated,
    selectStatus: (authentication) => authentication.status,
    selectError: (authentication) => authentication.error,
  },
});

export const { login, logout } = authSlice.actions;
export const { selectMe, selectIsAuthenticated, selectStatus, selectError } =
  authSlice.selectors;
