import { ParticipantRolesEnum } from "@/typing/enum";
import { IOption } from "@/typing/interface";

interface IParticipant {
  role: ParticipantRolesEnum;
  user: IOption;
}

const getDefaultValue = (
  participants: IParticipant[],
  participantRole: ParticipantRolesEnum
): IOption[] => {
  return participants
    .filter((participant) => participant.role === participantRole)
    .map((participant) => participant.user);
};

export default getDefaultValue;
