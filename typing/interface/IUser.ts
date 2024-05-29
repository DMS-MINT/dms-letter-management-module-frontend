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

export type UserApiInputSerializer = IMember | IGuest;

export interface IUserOptions {
  value: string;
  label: string;
  user_type: "member" | "guest";
}
