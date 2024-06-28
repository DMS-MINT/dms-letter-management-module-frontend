import { IMe } from "./IMe";

export interface IComment {
  id: string;
  content: string;
  created_at: string;
  author: IMe;
  // replies?: IComment[];
}

export interface ICommentCreate {
  content: string;
}
