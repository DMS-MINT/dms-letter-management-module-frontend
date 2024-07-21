import { IAttachment } from "./IAttachment";
import { IComment } from "./IComment";
import { IMember } from "./IContact";
import {
	IParticipantInputSerializer,
	IParticipantOutputSerializer,
} from "./IParticipant";

export type LetterType = "internal" | "incoming" | "outgoing";
export interface ILetterListInputSerializer {
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
	letter_type: LetterType;
	participants: IParticipantInputSerializer[];
}

export interface ILetterDetails {
	id: string;
	reference_number: string;
	subject?: string;
	content?: string;
	letter_type: LetterType;
	current_state: string;
	owner: IMember;
	signature: File;
	submitted_at: string;
	published_at: string;
	created_at: string;
	updated_at: string;
	participants: IParticipantInputSerializer[];
	comments: IComment[];
	attachments: IAttachment[];
}
