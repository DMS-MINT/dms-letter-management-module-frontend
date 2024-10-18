import type { NewAttachmentType } from "@/types/shared";
import { create } from "zustand";

export type AttachmentStoreType = {
	newAttachments: NewAttachmentType[];
	removedAttachmentsIds: string[];
};

export type AttachmentActions = {
	addNewAttachment: (_attachment: NewAttachmentType) => void;
	removeNewAttachment: (_id: string) => void;
	restoreUploadedAttachment: (_id: string) => void;
	removeUploadedAttachment: (_id: string) => void;
	resetAttachmentStore: () => void;
};

export const createAttachmentStore = () =>
	create<AttachmentStoreType & AttachmentActions>((set) => ({
		newAttachments: [],
		removedAttachmentsIds: [],

		addNewAttachment: (attachment) =>
			set((state) => ({
				newAttachments: [...state.newAttachments, attachment],
			})),

		removeNewAttachment: (id) =>
			set((state) => ({
				newAttachments: state.newAttachments.filter(
					(attachment) => attachment.id !== id
				),
			})),

		restoreUploadedAttachment: (id) =>
			set((state) => ({
				removedAttachmentsIds: state.removedAttachmentsIds.filter(
					(removedId) => removedId !== id
				),
			})),

		removeUploadedAttachment: (id) =>
			set((state) => ({
				removedAttachmentsIds: [...state.removedAttachmentsIds, id],
			})),

		resetAttachmentStore: () =>
			set({ newAttachments: [], removedAttachmentsIds: [] }),
	}));

export const useDraftAttachmentStore = createAttachmentStore();

export const useAttachmentRevisionStore = createAttachmentStore();
