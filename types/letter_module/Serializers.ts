import type { LanguageEnum } from "../shared";
import type { LetterDetailType } from "./LetterType";
import type { ParticipantType } from "./ParticipantType";

export type PermissionsResponseType = {
	user_id: string;
	permissions: string[];
	is_current_user: boolean;
};

export type LetterDetailResponseType = {
	letter: LetterDetailType;
	permissions: Array<PermissionsResponseType>;
};

export type DraftLetterType = {
	subject: string;
	content: string;
	letter_type: "internal" | "outgoing" | "incoming";
	language: LanguageEnum;
	participants: ParticipantType[];
};

export type ModifiedLetterType = {
	subject: string;
	content: string;
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
