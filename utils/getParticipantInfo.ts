import { ParticipantRolesEnum } from "@/typing/enum";
import { IParticipantInputSerializer } from "@/typing/interface";

const getParticipantInfo = (
  role: ParticipantRolesEnum,
  participants: IParticipantInputSerializer[]
) => {
  const participantInfo = participants
    .filter((participant) => participant.role_name === role)
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
