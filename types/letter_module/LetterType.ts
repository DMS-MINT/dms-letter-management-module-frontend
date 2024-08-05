import type { ColumnDef } from "@tanstack/react-table";
import type { CommentType, LanguageEnum } from "../shared";
import type { MemberType } from "../user_module";
import type { ParticipantType } from "./ParticipantType";

export type SignatureType = {
	id: string;
	user: MemberType;
	e_signature: string;
};

export type LetterType = {
	id: string;
	reference_number: string;
	subject: string;
	content: string;
	current_state: string;
	has_read: boolean;
	sent_at: string;
	received_at: string;
	submitted_at: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	letter_type: "internal" | "outgoing" | "incoming";
	participants: ParticipantType[];
};

export type LetterColumnDefType = ColumnDef<LetterType>[];

export type LetterDetailType = {
	id: string;
	reference_number: string;
	subject?: string;
	content?: string;
	letter_type: "internal" | "outgoing" | "incoming";
	language: keyof typeof LanguageEnum;
	current_state: string;
	owner: MemberType;
	pdf_version: string;
	submitted_at: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	participants: ParticipantType[];
	comments: CommentType[];
};
