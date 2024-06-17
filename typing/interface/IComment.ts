import { IMember } from "./IUser";

export interface IComment {
  content: string;
  author: IMember;
  created_at: string;
}
