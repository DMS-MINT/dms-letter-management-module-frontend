import { IMember } from "./IUser";

export interface IComment {
  id: string;
  content: string;
  created_at: string;
  author: IMember;
  replies?: IComment[];
}
