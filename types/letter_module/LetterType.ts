import type { ColumnDef } from "@tanstack/react-table";
import type {
	CommentType,
	LanguageEnum,
	UploadedAttachmentType,
} from "../shared";
import type { UserType } from "../user_module";
import type { ParticipantDetailType } from "./ParticipantType";

export type LetterType = {
	id: string;
	reference_number: string;
	reference_number_am: string;
	subject: string;
	body: string;
	current_state: string;
	has_read: boolean;
	sent_at: string;
	received_at: string;
	submitted_at: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	letter_type: "internal" | "outgoing" | "incoming";
	participants: ParticipantDetailType[];
};

export type LetterColumnDefType = ColumnDef<LetterType, any>[];

export type LetterDetailType = {
	sender: any;
	recipient: any;
	id: string;
	reference_number: string;
	reference_number_am: string;
	subject?: string;
	body?: string;
	letter_type: "internal" | "outgoing" | "incoming";
	language: keyof typeof LanguageEnum;
	current_state: string;
	owner: UserType;
	pdf_version: string;
	submitted_at: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	participants: ParticipantDetailType[];
	comments: CommentType[];
	letter_attachments: UploadedAttachmentType[];
};
