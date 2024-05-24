import { LetterStatusEnum } from "@/typing/enum";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

interface IParticipant {
  role: number;
  user:
    | { id: string; user_type: "member" }
    | { name: string; user_type: "guest" };
}

interface IOutputSerializer {
  subject: string;
  content: string;
  status: LetterStatusEnum;
  letter_type: "internal" | "incoming" | "outgoing";
  participants: IParticipant[];
}

const initialState: IOutputSerializer = {
  subject: "",
  content: "",
  status: LetterStatusEnum.DRAFT,
  letter_type: "internal",
  participants: [],
};

const composeSlice = createSlice({
  name: "letter_compose_slice",
  initialState,
  reducers: {
    resetState: () => initialState,
    updateSubject: (state, action: PayloadAction<string>) => {
      state.subject = action.payload;
    },
    updateContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setLetterType: (
      state,
      action: PayloadAction<"internal" | "incoming" | "outgoing">
    ) => {
      state.letter_type = action.payload;
    },
    addParticipant: (
      state,
      action: PayloadAction<{
        id: string;
        role: number;
        name: string;
        user_type: "member" | "guest";
      }>
    ) => {
      const newParticipant: IParticipant = {
        role: action.payload.role,
        user:
          action.payload.user_type === "member"
            ? { id: action.payload.id, user_type: "member" }
            : { name: action.payload.name, user_type: "guest" },
      };

      state.participants.push(newParticipant);
    },
    removeParticipant: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        role: number;
        user_type: "member" | "guest";
      }>
    ) => {
      state.participants = state.participants.filter((participant) => {
        if (participant.role !== action.payload.role) return true;

        if (action.payload.user_type === "member" && "id" in participant.user) {
          return participant.user.id !== action.payload.id;
        } else if (
          action.payload.user_type === "guest" &&
          "name" in participant.user
        ) {
          return participant.user.name !== action.payload.name;
        }

        return true;
      });
    },
    setLetterStatus: (state, action: PayloadAction<LetterStatusEnum>) => {
      state.status = action.payload;
    },
  },
});

export const {
  resetState,
  updateSubject,
  updateContent,
  setLetterType,
  addParticipant,
  removeParticipant,
  setLetterStatus,
} = composeSlice.actions;
export default composeSlice.reducer;
