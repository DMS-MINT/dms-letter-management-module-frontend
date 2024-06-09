import {
  ILetterCreateSerializer,
  ILetterDetailInputSerializer,
} from "@/typing/interface";
import { LetterStatusEnum, ParticipantRolesEnum } from "@/typing/enum";

const createLetterSerializer = (
  letter: ILetterDetailInputSerializer
): ILetterCreateSerializer => {
  const participants = letter.participants.map((participant) => ({
    user: participant.user,
    role: ParticipantRolesEnum[
      participant.role as keyof typeof ParticipantRolesEnum
    ],
    message: participant.message,
  }));

  const subject = letter.subject ? letter.subject : undefined;
  const content = letter.content ? letter.content : undefined;

  return {
    ...(subject && { subject }),
    ...(content && { content }),
    status: LetterStatusEnum[letter.status as keyof typeof LetterStatusEnum],
    participants,
    letter_type: letter.letter_type,
  };
};

export default createLetterSerializer;
