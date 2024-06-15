import { ParticipantRolesEnum } from "../enum";
import { ContactType } from "./IContact";

interface BaseParticipant {
  user: ContactType;
}

export interface IParticipantInputSerializer extends BaseParticipant {
  role_name: ParticipantRolesEnum;
  message?: string;
}

export interface IParticipantOutputSerializer extends BaseParticipant {
  role_name: ParticipantRolesEnum;
}
