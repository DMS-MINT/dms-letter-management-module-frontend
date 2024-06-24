import { ParticipantRolesEnum } from "../enum";
import { ContactType, UserCreateSerializer } from "./IContact";
export interface IParticipantInputSerializer {
  id: string;
  user: ContactType;
  role: ParticipantRolesEnum;
}

export interface IParticipantOutputSerializer {
  user: UserCreateSerializer;
  role: Exclude<
    ParticipantRolesEnum,
    ParticipantRolesEnum.COLLABORATOR | ParticipantRolesEnum.ADMINISTRATOR
  >;
}
