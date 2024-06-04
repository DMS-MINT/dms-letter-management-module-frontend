import { ContactType, IOption } from "@/typing";

const optionToContact = (option: IOption): ContactType => {
  if (option.user_type === "member") {
    return {
      id: option.value,
      full_name: "",
      job_title: option.label,
      user_type: "member",
    };
  } else if (option.user_type === "guest") {
    return {
      id: option.value,
      name: option.label,
      user_type: "guest",
    };
  } else {
    throw new Error("Invalid user type in option");
  }
};

export default optionToContact;
