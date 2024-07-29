import { create } from "zustand";

export type UIStoreType = {
	isDrawerOpen: boolean;
};

export type Actions = {
	toggleDrawerVisibility: () => void;
};

export const useUiStore = create<UIStoreType & Actions>()((set) => ({
	isDrawerOpen: true,
	toggleDrawerVisibility: () =>
		set((state) => ({
			isDrawerOpen: !state.isDrawerOpen,
		})),
}));
