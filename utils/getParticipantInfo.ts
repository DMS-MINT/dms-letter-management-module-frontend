import type { ParticipantType, RoleEnum } from "@/types/letter_module";

const getParticipantInfo = (
	role: RoleEnum,
	participants: ParticipantType[]
) => {
	const participantInfo = participants
		.filter((participant) => participant.role === role)
		.map((participant) => {
			if (participant.user.user_type === "member") {
				return participant.user.job_title;
			} else if (participant.user.user_type === "guest") {
				return participant.user.name;
			} else {
				return "Unknown user type";
			}
		})
		.join(", ");

	return participantInfo;
};

export default getParticipantInfo;
