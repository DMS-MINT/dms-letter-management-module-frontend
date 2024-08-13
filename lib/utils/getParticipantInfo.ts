import type { ParticipantDetailType, RoleEnum } from "@/types/letter_module";

const getParticipantInfo = (
	role: RoleEnum,
	participants: ParticipantDetailType[]
) => {
	const participantInfo = participants
		.filter((participant) => participant.role === role)
		.map((participant) => {
			if (participant.participant_type === "user") {
				return participant.user.full_name;
			} else if (participant.participant_type === "enterprise") {
				return participant.enterprise.name_en;
			} else if (participant.participant_type === "contact") {
				return participant.contact.full_name_en;
			} else {
				return "Unknown user type";
			}
		})
		.join(", ");

	return participantInfo;
};

export default getParticipantInfo;
