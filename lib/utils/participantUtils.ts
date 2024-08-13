import {
	getContacts,
	getEnterprises,
	getUsers,
} from "@/actions/user_module/action";
import type {
	ParticipantDetailType,
	ParticipantDraftType,
	RoleEnum,
} from "@/types/letter_module";
import type {
	ContactType,
	EnterpriseType,
	UserType,
} from "@/types/user_module";
import * as uuidv4 from "uuid";

export type OptionType = UserType | EnterpriseType | ContactType;

export type ParticipantScopeType = "all" | "internal_staff" | "external_staff";

export type GroupType =
	| { label: "Users"; options: UserType[] }
	| { label: "Enterprises"; options: EnterpriseType[] }
	| { label: "Contacts"; options: ContactType[] };

export type Options = {
	users: UserType[];
	enterprises: EnterpriseType[];
	contacts: ContactType[];
};

export const actionDispatcher = async (scope: ParticipantScopeType) => {
	switch (scope) {
		case "all": {
			const [users, enterprises, contacts] = await Promise.all([
				getUsers(),
				getEnterprises(),
				getContacts(),
			]);

			if (!users.ok || !enterprises.ok || !contacts.ok) {
				throw {
					ok: false,
					message:
						`${!users.ok ? "ተጠቃሚዎችን" : ""} ${!enterprises.ok ? "የመንግስት ድርጅቶችን" : ""} ${!contacts.ok ? "የደንበኛ ዝርዝሮችን" : ""} ማምጣት አልተቻለም።`.trim(),
				};
			}

			const groups: GroupType[] = [
				{
					label: "Users",
					options: users.message,
				},
				{
					label: "Enterprises",
					options: enterprises.message,
				},
				{
					label: "Contacts",
					options: contacts.message,
				},
			];

			return groups;
		}
		case "internal_staff": {
			const response = await getUsers();

			if (!response.ok) throw response;

			const groups: GroupType[] = [
				{
					label: "Users",
					options: response.message,
				},
				{
					label: "Enterprises",
					options: [],
				},
				{
					label: "Contacts",
					options: [],
				},
			];

			return groups;
		}
		case "external_staff": {
			const [enterprises, contacts] = await Promise.all([
				getEnterprises(),
				getContacts(),
			]);

			if (!enterprises.ok || !contacts.ok) {
				throw {
					ok: false,
					message:
						`${!enterprises.ok ? "የመንግስት ድርጅቶችን" : ""} ${!contacts.ok ? "የደንበኛ ዝርዝሮችን" : ""} ማምጣት አልተቻለም።`.trim(),
				};
			}

			const groups: GroupType[] = [
				{
					label: "Users",
					options: [],
				},
				{
					label: "Enterprises",
					options: enterprises.message,
				},
				{
					label: "Contacts",
					options: contacts.message,
				},
			];

			return groups;
		}
		default:
			throw new Error("Invalid participant scope");
	}
};

export const handleCreateParticipant = (
	option: OptionType,
	role: RoleEnum
): ParticipantDetailType => {
	const { value } = option as unknown as { value: string };

	const contact: ContactType = {
		id: value,
		full_name_en: value,
		full_name_am: "guest",
		address: "",
		email: "",
		phone_number: "",
	};

	return participantSerializer(contact, role);
};

export const getIdOrValue = (
	removedValue: OptionType | { value: string }
): string => {
	return "id" in removedValue ? removedValue.id : removedValue.value;
};

const isOptionType = (option: any): option is OptionType => {
	return option.id ? true : false;
};

const isUserType = (option: any): option is UserType => {
	return option.job_title ? true : false;
};

const isEnterpriseType = (option: any): option is EnterpriseType => {
	return option.name_en ? true : false;
};

const isContactType = (option: any): option is ContactType => {
	return option.full_name_en ? true : false;
};

export const participantSerializer = (
	option: OptionType,
	role: RoleEnum
): ParticipantDetailType => {
	const id = uuidv4.v4();
	if (isUserType(option)) {
		return {
			id,
			role,
			user: option,
			participant_type: "user",
		};
	} else if (isEnterpriseType(option)) {
		return {
			id,
			role,
			enterprise: option,
			participant_type: "enterprise",
		};
	} else if (isContactType(option)) {
		return {
			id,
			role,
			contact: option,
			participant_type: "contact",
		};
	}

	throw new Error("Unexpected option type");
};

export const getLabel = (
	option: OptionType | { label: string; value: string }
): string => {
	if (isOptionType(option)) {
		if (isUserType(option)) {
			return option.job_title;
		} else if (isEnterpriseType(option)) {
			return option.name_en;
		} else if (isContactType(option)) {
			return option.full_name_am;
		}
	}
	return option.label;
};

export const getValue = (
	option: OptionType | { label: string; value: string }
): string => {
	if (isOptionType(option)) {
		if (isUserType(option)) {
			return option.id;
		} else if (isEnterpriseType(option)) {
			return option.id;
		} else if (isContactType(option)) {
			return option.full_name_en;
		}
	}
	return option.label;
};

export const getDefaultValue = (
	participants: ParticipantDetailType[],
	role: RoleEnum
): OptionType[] => {
	return participants
		.filter((participant) => participant.role === role)
		.map((participant) => {
			if (participant.participant_type === "user") {
				return participant.user;
			} else if (participant.participant_type === "enterprise") {
				return participant.enterprise;
			} else if (participant.participant_type === "contact") {
				return participant.contact;
			}

			throw new Error("Unexpected participant type");
		});
};

export const isOptionDisabled = (
	option: OptionType,
	participants: ParticipantDetailType[]
): boolean => {
	return participants.some((participant) => {
		if (participant.participant_type === "user") {
			return participant.user.id === option.id;
		} else if (participant.participant_type === "enterprise") {
			return participant.enterprise.id === option.id;
		} else if (participant.participant_type === "contact") {
			return participant.contact.id === option.id;
		}
		throw new Error("Unexpected participant type");
	});
};

export const generateDraftParticipant = (
	participants: ParticipantDetailType[]
): ParticipantDraftType[] => {
	return participants.map((participant) => {
		if (participant.participant_type === "user") {
			return {
				id: participant.id,
				role: participant.role,
				user_id: participant.user.id,
				participant_type: "user",
			};
		} else if (participant.participant_type === "enterprise") {
			return {
				id: participant.id,
				role: participant.role,
				enterprise_id: participant.enterprise.id,
				participant_type: "enterprise",
			};
		} else if (participant.participant_type === "contact") {
			return {
				id: participant.id,
				role: participant.role,
				contact: {
					full_name_en: participant.contact.full_name_en,
					full_name_am: participant.contact.full_name_am,
					address: participant.contact.address,
					email: participant.contact?.email || null,
					phone_number: participant.contact?.phone_number || null,
				},
				participant_type: "contact",
			};
		}

		throw new Error("Unexpected participant type");
	});
};
