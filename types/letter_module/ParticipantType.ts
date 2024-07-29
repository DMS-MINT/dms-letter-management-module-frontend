import { GuestType, MemberType } from "../user_module";
import { RoleEnum } from "./RoleEnum";

export type ParticipantType = {
	id: string;
	user: MemberType | GuestType;
	role: RoleEnum;
};
