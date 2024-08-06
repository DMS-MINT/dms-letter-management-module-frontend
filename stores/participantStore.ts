import type { ParticipantType } from "@/types/letter_module";
import { create } from "zustand";

export type ParticipantStoreType = {
	participants: ParticipantType[];
};

export type ParticipantActions = {
	setParticipants: (_participants: ParticipantType[]) => void;
	addParticipant: (_participant: ParticipantType) => void;
	removeParticipant: (_user_id: string) => void;
	resetParticipantStore: () => void;
};

export const useParticipantStore = create<
	ParticipantStoreType & ParticipantActions
>((set) => ({
	participants: [],

	setParticipants: (participants) =>
		set(() => ({
			participants: participants,
		})),

	addParticipant: (participant) =>
		set((state) => ({
			participants: [...state.participants, participant],
		})),

	removeParticipant: (user_id) =>
		set((state) => ({
			participants: state.participants.filter((p) => p.user.id !== user_id),
		})),

	resetParticipantStore: () => set({ participants: [] }),
}));
