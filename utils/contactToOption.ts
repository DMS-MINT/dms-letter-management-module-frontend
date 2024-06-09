import { ContactType, IGuest, IMember, IOption } from "@/typing/interface";

const contactToOption = (contact: ContactType): IOption => {
  if (contact.user_type === "member") {
    const memberContact = contact as IMember;
    return {
      value: memberContact.id,
      label: memberContact.job_title,
      user_type: "member",
    };
  } else if (contact.user_type === "guest") {
    const guestContact = contact as IGuest;
    return {
      value: guestContact.id,
      label: guestContact.name,
      user_type: "guest",
    };
  } else {
    throw new Error("Invalid contact type");
  }
};

export default contactToOption;
