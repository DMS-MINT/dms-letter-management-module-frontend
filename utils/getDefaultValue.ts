import { ParticipantRolesEnum } from "@/typing/enum";
import { ContactType, IParticipantInputSerializer } from "@/typing/interface";

const getDefaultValue = (
  participants: IParticipantInputSerializer[],
  participantRole: ParticipantRolesEnum
): ContactType[] => {
  return participants
    .filter((participant) => participant.role === participantRole)
    .map((participant) => participant.user);
};

export default getDefaultValue;
