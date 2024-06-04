export interface IMember {
  id: string;
  full_name: string;
  job_title: string;
  user_type: "member";
}

export interface IGuest {
  id: string;
  name: string;
  user_type: "guest";
}

export type ContactType = IMember | IGuest;

export type UserType = "member" | "guest";

export interface IOption {
  value: string;
  label: string;
  user_type: UserType;
}
