import { IParticipantInputSerializer } from "@/typing";

const getParticipantInfo = (
  role: string,
  participants: IParticipantInputSerializer[]
) => {
  return participants
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
};

export default getParticipantInfo;
