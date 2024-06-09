import { IOption } from "@/typing/interface";

interface IParticipant {
  role: string;
  user: IOption;
}

const getDefaultValue = (
  participants: IParticipant[],
  filterBy: string
): IOption[] => {
  return participants
    .filter((participant) => participant.role === filterBy)
    .map((participant) => participant.user);
};

export default getDefaultValue;
