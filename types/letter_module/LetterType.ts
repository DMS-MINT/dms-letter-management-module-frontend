import type { ColumnDef } from "@tanstack/react-table";
import type { AttachmentType, CommentType } from "../shared";
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

// export type LetterColumnDefType = ColumnDef<LetterType>[];
export type LetterColumnDefType = ColumnDef<LetterType, any>[];

export type LetterDetailType = {
	sender: any;
	recipient: any;
	id: string;
	reference_number: string;
	subject?: string;
	content?: string;
	letter_type: "internal" | "outgoing" | "incoming";
	current_state: string;
	owner: MemberType;
	signature: string;
	submitted_at: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	participants: ParticipantType[];
	comments: CommentType[];
	attachments: AttachmentType[];
	e_signature: SignatureType[];
};
