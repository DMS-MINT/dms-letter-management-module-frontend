import type { GuestType, MemberType } from "../user_module";
import type { RoleEnum } from "./RoleEnum";

export type ParticipantType = {
	id: string;
	user: MemberType | GuestType;
	role: RoleEnum;
};
