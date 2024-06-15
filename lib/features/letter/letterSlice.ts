import { createAppSlice } from "@/lib/createAppSlice";
import {
  ILetterDetailInputSerializer,
  ILetterListInputSerializer,
  ILetterCreateSerializer,
  ILetterUpdateSerializer,
  LetterType,
  IParticipantInputSerializer,
} from "@/typing/interface";
import {
  get_letters,
  get_letter_details,
  create_letter,
  update_letter,
  delete_letter,
} from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { RequestStatusEnum } from "@/typing/enum";

export interface ILetterSliceState {
  letters: ILetterListInputSerializer[];
  letter: ILetterDetailInputSerializer;
  status: RequestStatusEnum;
  error: string | null;
}

const initialState: ILetterSliceState = {
  letters: [] as ILetterListInputSerializer[],
  letter: {
    participants: [] as IParticipantInputSerializer[],
    letter_type: "internal",
  } as ILetterDetailInputSerializer,
  status: RequestStatusEnum.IDLE,
  error: null,
};

export const letterSlice = createAppSlice({
  name: "letter",
  initialState,

  reducers: (create) => ({
    resetLetterDetail: create.reducer((state, _) => {
      state.letter = initialState.letter;
    }),
    updateSubject: create.reducer((state, action: PayloadAction<string>) => {
      state.letter.subject = action.payload;
    }),
    updateContent: create.reducer((state, action: PayloadAction<string>) => {
      state.letter.content = action.payload;
    }),
    setLetterType: create.reducer(
      (state, action: PayloadAction<LetterType>) => {
        state.letter.letter_type = action.payload;
      }
    ),
    addParticipant: create.reducer(
      (state, action: PayloadAction<IParticipantInputSerializer>) => {
        state.letter.participants.push(action.payload);
      }
    ),
    removeParticipant: create.reducer(
      (state, action: PayloadAction<IParticipantInputSerializer>) => {
        state.letter.participants = state.letter.participants.filter(
          (participant) => {
            if (participant.role_name !== action.payload.role_name) return true;

            if (
              action.payload.user.user_type === "member" &&
              "id" in participant.user
            ) {
              return participant.user.id !== action.payload.user.id;
            } else if (
              action.payload.user.user_type === "guest" &&
              "name" in participant.user
            ) {
              return participant.user.name !== action.payload.user.name;
            }

            return true;
          }
        );
      }
    ),
    getLetters: create.asyncThunk(
      async (category: string) => {
        const response = await get_letters(category);
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Fetching letters, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<ILetterListInputSerializer[]>
        ) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          state.letters = action.payload;
          toast.dismiss();
          toast.success("Letters successfully retrieved!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to fetch letters";
          toast.dismiss();
          toast.error(action.error.message || "Failed to fetch letters");
        },
      }
    ),
    getLetterDetails: create.asyncThunk(
      async (reference_number: string) => {
        const response = await get_letter_details(reference_number);
        return response;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Fetching letter details, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<ILetterDetailInputSerializer>
        ) => {
          state.status = RequestStatusEnum.IDLE;
          state.error = null;
          state.letter = action.payload;
          toast.dismiss();
          toast.success("Letter details successfully retrieved!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error =
            action.error.message || "Failed to fetch letter details";
          toast.dismiss();
          toast.error(action.error.message || "Failed to fetch letter details");
        },
      }
    ),
    createLetter: create.asyncThunk(
      async (letter: ILetterCreateSerializer) => {
        const response = await create_letter(letter);
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Creating letter, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<ILetterDetailInputSerializer>
        ) => {
          state.status = RequestStatusEnum.FULFILLED;
          state.letter = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Letter successfully created!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to create letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to create letter");
        },
      }
    ),
    updateLetter: create.asyncThunk(
      async ({
        reference_number,
        letter,
      }: {
        reference_number: string;
        letter: ILetterUpdateSerializer;
      }) => {
        const response = await update_letter(reference_number, letter);
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Updating letter, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<ILetterDetailInputSerializer>
        ) => {
          state.status = RequestStatusEnum.IDLE;
          state.letter = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Letter successfully updated!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to update letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to update letter");
        },
      }
    ),
    deleteLetter: create.asyncThunk(
      async (reference_number: string) => {
        const response = await delete_letter(reference_number);
        const data = await response.data;
        return data;
      },
      {
        pending: (state) => {
          state.status = RequestStatusEnum.LOADING;
          state.error = null;
          toast.dismiss();
          toast.loading("Deleting letter, Please wait...");
        },
        fulfilled: (
          state,
          action: PayloadAction<ILetterDetailInputSerializer>
        ) => {
          state.status = RequestStatusEnum.IDLE;
          state.letter = action.payload;
          state.error = null;
          toast.dismiss();
          toast.success("Letter successfully deleted!");
        },
        rejected: (state, action) => {
          state.status = RequestStatusEnum.FAILED;
          state.error = action.error.message || "Failed to create letter";
          toast.dismiss();
          toast.error(action.error.message || "Failed to create letter");
        },
      }
    ),
  }),

  selectors: {
    selectLetters: (letter) => letter.letters,
    selectLetterDetails: (letter) => letter.letter,
    selectStatus: (letter) => letter.status,
    selectError: (letter) => letter.error,
  },
});

export const {
  resetLetterDetail,
  updateSubject,
  updateContent,
  setLetterType,
  addParticipant,
  removeParticipant,
  getLetters,
  getLetterDetails,
  createLetter,
  updateLetter,
  deleteLetter,
} = letterSlice.actions;
export const { selectLetters, selectLetterDetails, selectStatus, selectError } =
  letterSlice.selectors;
