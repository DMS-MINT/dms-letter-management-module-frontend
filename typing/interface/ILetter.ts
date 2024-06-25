import { IComment } from "./IComment";
import {
  IParticipantInputSerializer,
  IParticipantOutputSerializer,
} from "./IParticipant";

export type LetterType = "internal" | "incoming" | "outgoing";
export interface ILetterListInputSerializer {
  id: string;
  reference_number: string;
  subject: string;
  content: string;
  current_state: string;
  has_read: boolean;
  sent_at: string;
  received_at: string;
  created_at: string;
  updated_at: string;
  letter_type: LetterType;
  participants: IParticipantInputSerializer[];
}

export interface ILetterDetailInputSerializer
  extends ILetterListInputSerializer {
  content: string;
  comments: IComment[];
}

export interface ILetterCreateSerializer {
  subject?: string;
  content?: string;
  letter_type: LetterType;
  participants: IParticipantOutputSerializer[];
}

export interface ILetterUpdateSerializer {
  subject?: string;
  content?: string;
  participants: IParticipantOutputSerializer[];
}
