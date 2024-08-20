import type { CurrentUserType } from "@/types/user_module";

export type CommentType = {
	id: string;
	message: string;
	created_at: string;
	author: CurrentUserType;
};
