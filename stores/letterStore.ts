import { DraftLetterType } from "@/types/letter_module";
import { create } from "zustand";

export type DraftLetterStoreType = {
	draftLetter: DraftLetterType;
};

export type DraftLetterActions = {
	setDraftLetter: (draftLetter: DraftLetterType) => void;
	updateDraftField: (field: keyof DraftLetterType, value: any) => void;
	resetDraft: () => void;
};

export const useDraftLetterStore = create<
	DraftLetterStoreType & DraftLetterActions
>()((set) => ({
	draftLetter: {
		subject: "",
		content: "",
		letter_type: "internal",
		participants: [],
	},
	setDraftLetter: () => {},
	updateDraftField: () => {},
	resetDraft: () => {},
}));

export const useLetterStore = create((set) => ({}));
