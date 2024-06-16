import { createAppSlice } from "@/lib/createAppSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RequestStatusEnum } from "@/typing/enum";
import { IPermissions } from "@/typing/interface";

export interface IWorkflowSliceState {
  permissions: IPermissions;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: IWorkflowSliceState = {
  permissions: {} as IPermissions,
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const workflowSlice = createAppSlice({
  name: "workflow",
  initialState,

  reducers: (create) => ({
    setPermissions: create.reducer(
      (state, action: PayloadAction<IPermissions>) => {
        state.permissions = action.payload;
      }
    ),
    // getPermissions: create.asyncThunk(
    //   async (reference_number: string) => {
    //     const response = await delete_letter(reference_number);
    //     const data = await response.data;
    //     return data;
    //   },
    //   {
    //     pending: (state) => {
    //       state.status = RequestStatusEnum.LOADING;
    //       state.error = null;
    //       toast.dismiss();
    //       toast.loading("Deleting letter, Please wait...");
    //     },
    //     fulfilled: (
    //       state,
    //       action: PayloadAction<ILetterDetailInputSerializer>
    //     ) => {
    //       state.status = RequestStatusEnum.IDLE;
    //       state.letter = action.payload;
    //       state.error = null;
    //       toast.dismiss();
    //       toast.success("Letter successfully deleted!");
    //     },
    //     rejected: (state, action) => {
    //       state.status = RequestStatusEnum.FAILED;
    //       state.error = action.error.message || "Failed to create letter";
    //       toast.dismiss();
    //       toast.error(action.error.message || "Failed to create letter");
    //     },
    //   }
    // ),
  }),

  selectors: {
    selectPermissions: (workflow) => workflow.permissions,
    selectStatus: (workflow) => workflow.status,
    selectError: (workflow) => workflow.error,
  },
});

export const { setPermissions } = workflowSlice.actions;
export const { selectPermissions, selectStatus, selectError } =
  workflowSlice.selectors;
