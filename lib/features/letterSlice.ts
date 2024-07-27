import { createAppSlice } from "@/lib/createAppSlice";
import { DraftLetterType, ParticipantType } from "@/types/letter_module";
import type { PayloadAction } from "@reduxjs/toolkit";

type LetterSliceType = {
	new_letter: DraftLetterType;
};

const initialState: LetterSliceType = {
	new_letter: {
		letter_type: "outgoing",
		subject: "",
		content: "",
		participants: [],
	},
};

export const letterSlice = createAppSlice({
	name: "letter_management",
	initialState,

	reducers: (create) => ({
		setLetterType: create.reducer(
			(state, action: PayloadAction<"internal" | "outgoing" | "incoming">) => {
				state.new_letter.letter_type = action.payload;
			}
		),
		handleSubjectChange: create.reducer(
			(state, action: PayloadAction<string>) => {
				state.new_letter.subject = action.payload;
			}
		),
		handleContentChange: create.reducer(
			(state, action: PayloadAction<string>) => {
				state.new_letter.content = action.payload;
			}
		),
		addParticipant: create.reducer(
			(state, action: PayloadAction<ParticipantType>) => {
				state.new_letter.participants.push(action.payload);
			}
		),
		removeParticipant: create.reducer(
			(state, action: PayloadAction<{ id: string }>) => {
				state.new_letter.participants = state.new_letter.participants.filter(
					(participant) => participant.id !== action.payload.id
				);
			}
		),
	}),

	selectors: {
		selectNewLetter: (letter) => letter.new_letter,
	},
});

export const { selectNewLetter } = letterSlice.selectors;
export const {
	setLetterType,
	handleSubjectChange,
	handleContentChange,
	addParticipant,
	removeParticipant,
} = letterSlice.actions;
