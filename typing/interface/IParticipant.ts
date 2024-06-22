import { ParticipantRolesEnum } from "../enum";
import { ContactType } from "./IContact";

interface BaseParticipant {
  id: string;
  user: ContactType;
  role: ParticipantRolesEnum;
}

export interface IParticipantInputSerializer extends BaseParticipant {
  message?: string;
}

export interface IParticipantOutputSerializer extends BaseParticipant {
  message?: string;
}
