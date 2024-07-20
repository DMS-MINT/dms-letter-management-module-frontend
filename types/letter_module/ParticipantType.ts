import { RoleEnum } from "./RoleEnum";
import { MemberType, GuestType } from "../user_module";

export type ParticipantType = {
	id: string;
	user: MemberType | GuestType;
	role: RoleEnum;
};
