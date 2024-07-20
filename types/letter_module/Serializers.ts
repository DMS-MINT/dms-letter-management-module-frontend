import { LetterType } from "./LetterType";

export type LetterDetailResponseType = {
	letter: LetterType;
	permissions: {
		user_id: string;
		permissions: string[];
		is_current_user: boolean;
	};
};

export type NewLetterType = {};

export type UpdatedLetterType = {};
