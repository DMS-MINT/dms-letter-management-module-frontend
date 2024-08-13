import type { ParticipantDetailType } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import { create } from "zustand";

export type LetterContentStoreType = {
	subject: string;
	body: string;
	letter_type: "internal" | "outgoing" | "incoming";
	language: LanguageEnum;
	reference_number: string;
	published_at: string;
};

export type ContentStoreActions = {
	initializeContent: (_content: LetterContentStoreType) => void;
	updateLetterField: (
		_field: keyof LetterContentStoreType,
		_value: string | LanguageEnum
	) => void;
	resetContent: () => void;
};

export type ParticipantStoreType = {
	participants: ParticipantDetailType[];
};

export type ParticipantStoreActions = {
	initializeParticipants: (_participants: ParticipantDetailType[]) => void;
	addParticipant: (_participant: ParticipantDetailType) => void;
	removeParticipant: (_user_id: string) => void;
	resetParticipantStore: () => void;
};

export type LetterStoreType = LetterContentStoreType &
	ContentStoreActions &
	ParticipantStoreType &
	ParticipantStoreActions;

export const createParticipantStore = () =>
	create<ParticipantStoreType & ParticipantStoreActions>((set) => ({
		participants: [],

		initializeParticipants: (participants) =>
			set(() => ({
				participants: participants,
			})),

		addParticipant: (participant) =>
			set((state) => ({
				participants: [...state.participants, participant],
			})),

		removeParticipant: (id) =>
			set((state) => ({
				participants: state.participants.filter((participant) => {
					if (participant.participant_type === "user") {
						return participant.user.id !== id;
					} else if (participant.participant_type === "enterprise") {
						return participant.enterprise.id !== id;
					} else if (participant.participant_type === "contact") {
						return participant.contact.id !== id;
					}

					throw new Error("Unexpected participant type");
				}),
			})),

		resetParticipantStore: () => set({ participants: [] }),
	}));

export const createLetterStore = () =>
	create<LetterStoreType>((set) => ({
		subject: "",
		body: "",
		letter_type: "internal",
		language: LanguageEnum.English,
		reference_number: "",
		published_at: "",
		participants: [],

		initializeContent: (content) => set({ ...content }),

		updateLetterField: (field, value) =>
			set((state) => ({ ...state, [field]: value })),

		resetContent: () =>
			set({
				subject: "",
				body: "",
				letter_type: "internal",
				language: LanguageEnum.English,
			}),

		initializeParticipants: (participants) =>
			set(() => ({
				participants: participants,
			})),

		addParticipant: (participant) =>
			set((state) => ({
				participants: [...state.participants, participant],
			})),

		removeParticipant: (id) =>
			set((state) => ({
				participants: state.participants.filter((participant) => {
					if (participant.participant_type === "user") {
						return participant.user.id !== id;
					} else if (participant.participant_type === "enterprise") {
						return participant.enterprise.id !== id;
					} else if (participant.participant_type === "contact") {
						return participant.contact.id !== id;
					}

					throw new Error("Unexpected participant type");
				}),
			})),
		resetParticipantStore: () => set({ participants: [] }),
	}));
