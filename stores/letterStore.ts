import { LanguageEnum } from "@/types/shared";
import { create } from "zustand";

export type LetterStoreType = {
	subject: string;
	content: string;
	letter_type: "internal" | "outgoing" | "incoming";
	language: LanguageEnum;
};

export type LetterActions = {
	setLetter: (_message: LetterStoreType) => void;
	updateLetterField: (
		_field: keyof LetterStoreType,
		_value: string | LanguageEnum
	) => void;
	resetContent: () => void;
};

export const useLetterStore = create<LetterStoreType & LetterActions>(
	(set) => ({
		subject: "",
		content: "",
		letter_type: "internal",
		language: LanguageEnum.English,
		setLetter: (message) => set({ ...message }),
		updateLetterField: (field, value) =>
			set((state) => ({ ...state, [field]: value })),

		resetContent: () => set({ subject: "", content: "" }),
	})
);
