import { IComposeState } from "@/typing";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IComposeState = {
  sender: [],
  recipient: [],
  cc: [],
  bcc: [],
  subject: [],
  content: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    updateSender: (state, action) => {
      state.sender = action.payload;
    },
    updateRecipient: (state, action) => {
      state.recipient = action.payload;
    },
    updateCC: (state, action) => {
      state.cc = action.payload;
    },
    updateBCC: (state, action) => {
      state.bcc = action.payload;
    },
    updateSubject: (state, action) => {
      state.subject = action.payload;
    },
    updateContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const {
  updateSender,
  updateRecipient,
  updateCC,
  updateSubject,
  updateContent,
} = uiSlice.actions;
export default uiSlice.reducer;
