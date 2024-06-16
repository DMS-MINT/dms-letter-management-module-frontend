import {
  ILetterCreateSerializer,
  ILetterDetailInputSerializer,
} from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";

const createLetterSerializer = (
  letter: ILetterDetailInputSerializer
): ILetterCreateSerializer => {
  const participants = letter.participants.map((participant) => ({
    id: participant.id,
    user: participant.user,
    role_name: participant.role_name,
    message: participant.message,
  }));

  const subject = letter.subject ? letter.subject : undefined;
  const content = letter.content ? letter.content : undefined;

  return {
    ...(subject && { subject }),
    ...(content && { content }),
    participants,
    letter_type: letter.letter_type,
  };
};

export default createLetterSerializer;
