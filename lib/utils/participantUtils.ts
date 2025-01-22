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
import { LanguageEnum } from "@/types/shared";
import type {
	ContactType,
	EnterpriseType,
	UserType,
} from "@/types/user_module";
import * as uuidv4 from "uuid";

export type OptionType = UserType | EnterpriseType | ContactType;

export type ParticipantScopeType = "all" | "internal_staff" | "external_staff";

export type GroupedOption =
	| { label: "የMINT ሰራተኞች"; options: UserType[] }
	| { label: "የእኔ ደንበኞች"; options: ContactType[] }
	| { label: "የመንግስት ድርጅቶች"; options: EnterpriseType[] };

export type Options = {
	users: UserType[];
	contacts: ContactType[];
	enterprises: EnterpriseType[];
};

export const actionDispatcher = async (scope: ParticipantScopeType) => {
	switch (scope) {
		case "all": {
			const [users, enterprises, contacts] = await Promise.all([
				getUsers("all"),
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

			const groups: GroupedOption[] = [
				{
					label: "የMINT ሰራተኞች",
					options: users.message,
				},
				{
					label: "የእኔ ደንበኞች",
					options: contacts.message,
				},
				{
					label: "የመንግስት ድርጅቶች",
					options: enterprises.message,
				},
			];

			return groups;
		}
		case "internal_staff": {
			const response = await getUsers("all");

			if (!response.ok) throw response;

			const groups: GroupedOption[] = [
				{
					label: "የMINT ሰራተኞች",
					options: response.message,
				},
				{
					label: "የእኔ ደንበኞች",
					options: [],
				},
				{
					label: "የመንግስት ድርጅቶች",
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

			const groups: GroupedOption[] = [
				{
					label: "የMINT ሰራተኞች",
					options: [],
				},
				{
					label: "የእኔ ደንበኞች",
					options: contacts.message,
				},
				{
					label: "የመንግስት ድርጅቶች",
					options: enterprises.message,
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
		address: {
			city_en: "",
			city_am: "",
		},
		email: "",
		phone_number: 0,
	};

	return participantSerializer(contact, role);
};

export const getIdOrValue = (
	removedValue: OptionType | { value: string }
): string => {
	return "id" in removedValue ? removedValue.id : removedValue.value;
};

export const isOptionType = (option: any): option is OptionType => {
	return option.id ? true : false;
};

export const isUserType = (option: any): option is UserType => {
	return option.user_profile?.job_title ? true : false;
};

export const isUserParticipantType = (
	participant: ParticipantDetailType
): participant is ParticipantDetailType & { user: UserType } => {
	return participant.participant_type === "user";
};

export const isEnterpriseType = (option: any): option is EnterpriseType => {
	return option.name_en ? true : false;
};

export const isContactType = (option: any): option is ContactType => {
	return option.full_name_en && option.address ? true : false;
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
	option: OptionType | { label: string; value: string },
	language: LanguageEnum
): string => {
	if (isOptionType(option)) {
		if (isUserType(option)) {
			return language === LanguageEnum.English
				? option.user_profile?.job_title.title_en
				: option.user_profile?.job_title.title_am;
		} else if (isEnterpriseType(option)) {
			return language === LanguageEnum.English ? option.name_en : option.name_am;
		} else if (isContactType(option)) {
			return language === LanguageEnum.English
				? option.full_name_en
				: option.full_name_am;
		}
	}
	return option.label;
};

export const getValue = (
	option: OptionType | { label: string; value: string },
	language: LanguageEnum
): string => {
	if (isOptionType(option)) {
		if (isUserType(option)) {
			return language === LanguageEnum.English
				? option.user_profile?.job_title.title_en
				: option.user_profile?.job_title.title_am;
		} else if (isEnterpriseType(option)) {
			return language === LanguageEnum.English ? option.name_en : option.name_am;
		} else if (isContactType(option)) {
			return language === LanguageEnum.English
				? option.full_name_en
				: option.full_name_am;
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
			console.warn("Unexpected participant type");
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
					address: {
						city_en: participant.contact.address.city_en,
						city_am: participant.contact.address.city_am,
					},
					email: participant.contact?.email || null,
					phone_number: participant.contact?.phone_number || null,
				},
				participant_type: "contact",
			};
		}

		throw new Error("Unexpected participant type");
	});
};
