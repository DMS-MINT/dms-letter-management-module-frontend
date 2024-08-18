import type { LanguageEnum } from "../shared";
import type { LetterDetailType } from "./LetterType";
import type { ParticipantDraftType } from "./ParticipantType";

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
	body: string;
	letter_type: "internal" | "outgoing" | "incoming";
	language: LanguageEnum;
	participants: ParticipantDraftType[];
};

export type ModifiedLetterType = {
	subject: string;
	body: string;
	participants: ParticipantDraftType[];
};

export type UpdatedLetterType = {};

export type ShareLetterRequestType = {
	participants: ParticipantDraftType[];
	message: string;
	permissions: (
		| "can_view_letter"
		| "can_update_letter"
		| "can_comment_letter"
		| "can_share_letter"
	)[];
};
