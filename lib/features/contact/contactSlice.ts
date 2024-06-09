import { createAppSlice } from "@/lib/createAppSlice";
import { RequestStatusEnum } from "@/typing/enum";
import { ContactType } from "@/typing/interface";
import { get_contacts } from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export interface IContactSliceState {
  contacts: ContactType[];
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: IContactSliceState = {
  contacts: [] as ContactType[],
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const contactSlice = createAppSlice({
  name: "contacts",
  initialState,

  reducers: (create) => ({
    getContacts: create.asyncThunk(
      async () => {
        const response = await get_contacts();
        return response.data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
        },
        fulfilled: (state, action: PayloadAction<ContactType[]>) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          state.contacts = action.payload;
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to fetch contacts";
          toast.error(action.error.message || "Failed to fetch contacts");
        },
      }
    ),
  }),

  selectors: {
    selectContacts: (contact) => contact.contacts,
  },
});

export const { getContacts } = contactSlice.actions;
export const { selectContacts } = contactSlice.selectors;
