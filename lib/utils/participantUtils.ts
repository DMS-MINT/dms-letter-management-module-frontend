import { getParticipantEntries } from "@/actions/user_module/action";
import type {
	ParticipantDetailType,
	ParticipantDraftType,
	ParticipantEntriesType,
	RoleEnum,
} from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import type {
	ContactType,
	EnterpriseType,
	MemberListType,
} from "@/types/user_module";
import * as uuidv4 from "uuid";

export type OptionType = MemberListType | EnterpriseType | ContactType;

export type ParticipantScopeType = "all" | "internal_staff" | "external_staff";

export type GroupedOption =
	| { label: "የMINT ሰራተኞች"; options: MemberListType[] }
	| { label: "የእኔ ደንበኞች"; options: ContactType[] }
	| { label: "የመንግስት ድርጅቶች"; options: EnterpriseType[] };

export type Options = {
	users: MemberListType[];
	contacts: ContactType[];
	enterprises: EnterpriseType[];
};

export const actionDispatcher = async (scope: ParticipantScopeType) => {
	switch (scope) {
		case "all": {
			const response = await getParticipantEntries(["all", true, true]);

			if (!response.ok) {
				throw new Error("");
			}

			const entries = response.message as ParticipantEntriesType;

			const groups: GroupedOption[] = [
				{
					label: "የMINT ሰራተኞች",
					options: entries.members,
				},
				{
					label: "የእኔ ደንበኞች",
					options: entries.contacts,
				},
				{
					label: "የመንግስት ድርጅቶች",
					options: entries.enterprises,
				},
			];

			return groups;
		}
		case "internal_staff": {
			const response = await getParticipantEntries(["all", false, false]);

			if (!response.ok) {
				throw new Error("");
			}

			const entries = response.message as ParticipantEntriesType;

			const groups: GroupedOption[] = [
				{
					label: "የMINT ሰራተኞች",
					options: entries.members,
				},
				{
					label: "የእኔ ደንበኞች",
					options: entries.contacts,
				},
				{
					label: "የመንግስት ድርጅቶች",
					options: entries.enterprises,
				},
			];

			return groups;
		}
		case "external_staff": {
			const response = await getParticipantEntries(["staff", true, true]);

			if (!response.ok) {
				throw new Error("");
			}

			const entries = response.message as ParticipantEntriesType;

			const groups: GroupedOption[] = [
				{
					label: "የMINT ሰራተኞች",
					options: [],
				},
				{
					label: "የእኔ ደንበኞች",
					options: entries.contacts,
				},
				{
					label: "የመንግስት ድርጅቶች",
					options: entries.enterprises,
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

export const isMemberType = (option: any): option is MemberListType => {
	return option.member_profile.job_title ? true : false;
};

export const isUserParticipantType = (
	participant: ParticipantDetailType
): participant is ParticipantDetailType & { user: MemberListType } => {
	return participant.participant_type === "member";
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
	if (isMemberType(option)) {
		return {
			id,
			role,
			member: option,
			participant_type: "member",
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
		if (isMemberType(option)) {
			return language === LanguageEnum.English
				? option.member_profile.job_title.title_en
				: option.member_profile.job_title.title_am;
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
		if (isMemberType(option)) {
			return language === LanguageEnum.English
				? option.member_profile.job_title.title_en
				: option.member_profile.job_title.title_am;
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
			if (participant.participant_type === "member") {
				return participant.member;
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
		if (participant.participant_type === "member") {
			return participant.member.id === option.id;
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
		if (participant.participant_type === "member") {
			return {
				id: participant.id,
				role: participant.role,
				member_id: participant.member.id,
				participant_type: "member",
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
