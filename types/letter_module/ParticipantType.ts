import type { ContactType, EnterpriseType, UserType } from "../user_module";
import type { RoleEnum } from "./RoleEnum";

export type ParticipantDetailType = {
	id: string;
	role: RoleEnum;
} & (
	| { user: UserType; participant_type: "user" }
	| { enterprise: EnterpriseType; participant_type: "enterprise" }
	| { contact: ContactType; participant_type: "contact" }
);

export type ParticipantDraftType = {
	id: string;
	role: RoleEnum;
} & (
	| { user_id: string; participant_type: "user" }
	| { enterprise_id: string; participant_type: "enterprise" }
	| { contact: Omit<ContactType, "id">; participant_type: "contact" }
);

export type CollaboratorType = {
	id: string;
	user: UserType;
	role: RoleEnum.COLLABORATOR;
};
