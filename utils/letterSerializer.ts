import {
  ILetterDetails,
  IParticipantOutputSerializer,
} from "@/typing/interface";

export default function letterSerializer(
  letterDetails: ILetterDetails,
  attachments: File[],
  signature: File
): FormData {
  //@ts-ignore
  const participants: IParticipantOutputSerializer[] =
    letterDetails?.participants.map((participant) => {
      if (participant?.user?.user_type === "member") {
        return {
          id: participant.id,
          user: {
            id: participant.user.id,
            user_type: "member",
          },
          role: participant.role,
        };
      } else if (participant?.user?.user_type === "guest") {
        return {
          id: participant.id,
          user: {
            id: participant.user.name,
            name: participant.user.name,
            user_type: "guest",
          },
          role: participant.role,
        };
      } else {
        return null;
      }
    });

  const subject = letterDetails.subject ? letterDetails.subject : "";
  const content = letterDetails.content ? letterDetails.content : "";

  const formData = new FormData();
  formData.append("subject", subject);
  formData.append("content", content);
  formData.append("letter_type", letterDetails.letter_type);
  formData.append("signature", signature);
  formData.append("participants", JSON.stringify(participants));

  attachments.forEach((attachment) => {
    formData.append("attachments", attachment);
  });

  return formData;
}
