import { ContactType } from "./IContact";

interface BaseParticipant {
  user: ContactType;
  message?: string;
}

export interface IParticipantInputSerializer extends BaseParticipant {
  role: string;
}

export interface IParticipantOutputSerializer extends BaseParticipant {
  role: number;
}
