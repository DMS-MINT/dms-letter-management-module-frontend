import {
	createLetterStore,
	createParticipantStore,
} from "./letterStoreCreator";

export const useDraftLetterStore = createLetterStore();

export const useLetterRevisionStore = createLetterStore();

export const useCollaboratorStore = createParticipantStore();
