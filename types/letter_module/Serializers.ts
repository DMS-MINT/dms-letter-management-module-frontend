import { LetterType } from "./LetterType";

export type PermissionsResponseType = {
	user_id: string;
	permissions: string[];
	is_current_user: boolean;
};

export type LetterDetailResponseType = {
	letter: LetterType;
	permissions: Array<PermissionsResponseType>;
};

export type NewLetterType = {};

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
