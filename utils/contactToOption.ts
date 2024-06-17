import {
  ContactType,
  IGuest,
  IMember,
  IOption,
  IParticipantInputSerializer,
} from "@/typing/interface";

const contactToOption = (participant: IParticipantInputSerializer): IOption => {
  const id: string = participant.id;
  const user: ContactType = participant.user;
  if (user.user_type === "member") {
    const memberContact = user as IMember;
    return {
      id: id,
      value: memberContact.id,
      label: memberContact.job_title,
      user_type: "member",
    };
  } else if (user.user_type === "guest") {
    const guestContact = user as IGuest;
    return {
      id: id,
      value: guestContact.id,
      label: guestContact.name,
      user_type: "guest",
    };
  } else {
    throw new Error("Invalid contact type");
  }
};

export default contactToOption;
