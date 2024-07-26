import { LetterDetailType } from "./LetterType";
import { ParticipantType } from "./ParticipantType";

export type PermissionsResponseType = {
	user_id: string;
	permissions: string[];
	is_current_user: boolean;
};

export type LetterDetailResponseType = {
	letter: LetterDetailType;
	permissions: Array<PermissionsResponseType>;
};

export type NewLetterType = {
	subject: string;
	content: string;
	letter_type: "internal" | "outgoing" | "incoming";
	participants: ParticipantType[];
};

export type UpdatedLetterType = {};

export type ShareLetterRequestType = {
	to: string[];
	message: string;
	permissions:
		| "can_view_letter"
		| "can_update_letter"
		| "can_comment_letter"
		| "can_share_letter";
};
