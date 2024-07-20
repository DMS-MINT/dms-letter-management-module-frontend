import { MemberType } from "../user_module";
import { AttachmentType, CommentType } from "../shared";
import { ParticipantType } from "./ParticipantType";

export type LetterType = {
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
};
