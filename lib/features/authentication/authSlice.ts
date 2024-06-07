import { createAppSlice } from "@/lib/createAppSlice";
import { RequestStatusEnum, IMe, ICredentials } from "@/typing";
import {
  get_authentication_token,
  delete_authentication_token,
  get_user_profile,
} from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
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
        fulfilled: (state, action) => {
          state.status = RequestStatusEnum.IDLE;
          state.is_authenticated = true;
          state.error = null;
          toast.dismiss();
          toast.success("Welcome back! You have successfully logged in.");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to login";
          state.is_authenticated = false;
          console.log(action.error);
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
    getUserProfile: create.asyncThunk(
      async () => {
        const response = await get_user_profile();
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<IMe>) => {
          state.status = RequestStatusEnum.IDLE;
          state.me = action.payload;
          state.error = null;
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to fetch user profile";
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

export const { login, logout, getUserProfile } = authSlice.actions;
export const { selectMe, selectIsAuthenticated, selectStatus, selectError } =
  authSlice.selectors;
