import { CurrentUserType } from "@/types/user_module";

export type CommentType = {
	id: string;
	content: string;
	created_at: string;
	author: CurrentUserType;
};
