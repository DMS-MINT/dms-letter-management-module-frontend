import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RequestStatusEnum } from "@/typing/enum";
import {
  IMe,
  IPermissions,
  IPermissionsInputSerializer,
  IShareLetterFormData,
} from "@/typing/interface";
import {
  close_letter,
  create_comment,
  delete_comment,
  update_comment,
  publish_letter,
  reopen_letter,
  retract_letter,
  share_letter,
  submit_letter,
  reject_letter,
} from "./actions";

export interface IWorkflowSliceState {
  permissions: IPermissionsInputSerializer[];
  currentUserPermissions: IPermissions;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: IWorkflowSliceState = {
  permissions: [] as IPermissionsInputSerializer[],
  currentUserPermissions: {} as IPermissions,
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const workflowSlice = createAppSlice({
  name: "workflow",
  initialState,

  reducers: (create) => ({
    setPermissions: create.reducer(
      (
        state,
        action: PayloadAction<{
          permissions: IPermissionsInputSerializer[];
          me: IMe;
        }>
      ) => {
        const current_user_perms =
          action.payload.permissions.find(
            (user) => user.user_id === action.payload.me.id
          )?.permissions || [];

        const current_user_permissions: IPermissions = {
          can_view_letter: false,
          can_update_letter: false,
          can_submit_letter: false,
          can_comment_letter: false,
          can_share_letter: false,
          can_trash_letter: false,
          can_restore_letter: false,
          can_remove_from_trash_letter: false,
          can_retract_letter: false,
          can_archive_letter: false,
          can_close_letter: false,
          can_publish_letter: false,
          can_reject_letter: false,
          can_reopen_letter: false,
        };

        current_user_perms.forEach((permission) => {
          if (permission in current_user_permissions) {
            current_user_permissions[permission as keyof IPermissions] = true;
          }
        });

        state.permissions = action.payload.permissions;
        state.currentUserPermissions = current_user_permissions;
      }
    ),
    shareLetter: create.asyncThunk(
      async ({
        reference_number,
        participants,
      }: {
        reference_number: string;
        participants: IShareLetterFormData;
      }) => {
        const response = await share_letter(reference_number, participants);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Sharing letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to share letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to share letter");
        },
      }
    ),
    submitLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await submit_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Submitting letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to submit letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to submit letter");
        },
      }
    ),
    publishLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await publish_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Publishing letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to publish letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to publish letter");
        },
      }
    ),
    rejectLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await reject_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Rejecting letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to reject letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to reject letter");
        },
      }
    ),
    retractLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await retract_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Retracting letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to retract letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to retract letter");
        },
      }
    ),
    closeLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await close_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Closing letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to close letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to close letter");
        },
      }
    ),
    reopenLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await reopen_letter(reference_number);
        const data = await response;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Reopening letter, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to reopen letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to reopen letter");
        },
      }
    ),
    createComment: create.asyncThunk(
      async ({
        reference_number,
        content,
      }: {
        reference_number: string;
        content: string;
      }) => {
        const data = await create_comment(content, reference_number);
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Creating comment, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to create comment";
          toast.dismiss();
          toast.error(action.error.message || "Failed to create comment");
        },
      }
    ),

    updateComment: create.asyncThunk(
      async ({
        comment_id,
        content,
      }: {
        comment_id: string;
        content: string;
      }) => {
        const data = await update_comment(comment_id, content);
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Updating comment, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to update comment";
          toast.dismiss();
          toast.error(action.error.message || "Failed to update comment");
        },
      }
    ),
    deleteComment: create.asyncThunk(
      async (comment_id: string) => {
        const data = await delete_comment(comment_id);
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Deleting comment, Please wait...");
        },
        fulfilled: (state, action: PayloadAction<string>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          toast.dismiss();
          toast.success(action.payload);
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to delete comment";
          toast.dismiss();
          toast.error(action.error.message || "Failed to delete comment");
        },
      }
    ),
  }),

  selectors: {
    selectPermissions: (workflow) => workflow.permissions,
    selectCurrentUserPermissions: (workflow) => workflow.currentUserPermissions,
    selectStatus: (workflow) => workflow.status,
    selectError: (workflow) => workflow.error,
  },
});

export const {
  setPermissions,
  shareLetter,
  submitLetter,
  publishLetter,
  rejectLetter,
  retractLetter,
  closeLetter,
  reopenLetter,
  createComment,
  updateComment,
  deleteComment,
} = workflowSlice.actions;
export const {
  selectPermissions,
  selectCurrentUserPermissions,
  selectStatus,
  selectError,
} = workflowSlice.selectors;
