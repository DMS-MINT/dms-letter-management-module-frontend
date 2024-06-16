import { ParticipantRolesEnum } from "@/typing/enum";
import {
  ILetterDetailInputSerializer,
  ILetterUpdateSerializer,
} from "@/typing/interface";

const updateLetterSerializer = (
  letter: ILetterDetailInputSerializer
): ILetterUpdateSerializer => {
  const participants = letter.participants.map((participant) => ({
    id: participant.id,
    user: participant.user,
    role_name:
      ParticipantRolesEnum[
        participant.role_name.toUpperCase() as keyof typeof ParticipantRolesEnum
      ],
  }));

  const subject = letter.subject ? letter.subject : undefined;
  const content = letter.content ? letter.content : undefined;

  return {
    ...(subject && { subject }),
    ...(content && { content }),
    participants,
  };
};

export default updateLetterSerializer;
