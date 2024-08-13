import { create } from "zustand";

export type UIStoreType = {
	isDrawerOpen: boolean;
	isLetterEdited: boolean;
	isLetterReadOnly: boolean;
};

export type UIActions = {
	toggleDrawerVisibility: () => void;
	setLetterEdited: (_edited: boolean) => void;
	setLetterReadOnly: (_readOnly: boolean) => void;
};

export const useUiStore = create<UIStoreType & UIActions>()((set) => ({
	isDrawerOpen: true,
	isLetterEdited: false,
	isLetterReadOnly: false,
	toggleDrawerVisibility: () =>
		set((state) => ({
			isDrawerOpen: !state.isDrawerOpen,
		})),

	setLetterEdited: (edited) => set({ isLetterEdited: edited }),
	setLetterReadOnly: (readOnly) => set({ isLetterReadOnly: readOnly }),
}));
