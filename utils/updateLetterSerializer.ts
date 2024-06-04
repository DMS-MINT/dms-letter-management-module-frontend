import {
  ILetterDetailInputSerializer,
  ILetterUpdateSerializer,
  ParticipantRolesEnum,
} from "@/typing";

const updateLetterSerializer = (
  letter: ILetterDetailInputSerializer
): ILetterUpdateSerializer => {
  return {
    subject: letter.subject,
    content: letter.content,
    participants: letter.participants.map((participant) => ({
      user: participant.user,
      role: ParticipantRolesEnum[
        participant.role as keyof typeof ParticipantRolesEnum
      ],
      message: participant.message,
    })),
  };
};

export default updateLetterSerializer;
