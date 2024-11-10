import type {
	ContactType,
	EnterpriseType,
	MemberListType,
} from "../user_module";
import type { RoleEnum } from "./RoleEnum";

export type ParticipantDetailType = {
	id: string;
	role: RoleEnum;
} & (
	| { member: MemberListType; participant_type: "member" }
	| { contact: ContactType; participant_type: "contact" }
	| { enterprise: EnterpriseType; participant_type: "enterprise" }
);

export type ParticipantDraftType = {
	id: string;
	role: RoleEnum;
} & (
	| { member_id: string; participant_type: "member" }
	| { contact: Omit<ContactType, "id">; participant_type: "contact" }
	| { enterprise_id: string; participant_type: "enterprise" }
);

export type CollaboratorType = {
	id: string;
	user: MemberListType;
	role: RoleEnum.COLLABORATOR;
};

export type ParticipantEntriesType = {
	members: MemberListType[];
	contacts: ContactType[];
	enterprises: EnterpriseType[];
};
