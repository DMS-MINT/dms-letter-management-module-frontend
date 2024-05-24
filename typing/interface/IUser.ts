export interface IMe {
  id: string;
  full_name: string;
}

export interface IMember {
  id: string;
  job_title: string;
  department: string;
  user_type: "member";
}
export interface IGuest {
  name: string;
  user_type: "guest";
}

export interface IUserOptions {
  value: string;
  label: string;
  user_type: "member" | "guest";
}
