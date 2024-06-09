import {
  IParticipantInputSerializer,
  IParticipantOutputSerializer,
} from "./IParticipant";

export type LetterType = "internal" | "incoming" | "outgoing";

export interface ILetterListInputSerializer {
  id: string;
  subject: string;
  content: string;
  status: string;
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
}

export interface ILetterCreateSerializer {
  subject?: string;
  content?: string;
  status: number;
  letter_type: LetterType;
  participants: IParticipantOutputSerializer[];
}

export interface ILetterUpdateSerializer {
  subject?: string;
  content?: string;
  participants: IParticipantOutputSerializer[];
}
