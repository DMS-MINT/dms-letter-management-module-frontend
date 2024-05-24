import { RolesEnum } from "../enum";

const roleDictionary: Record<RolesEnum, string> = {
  [RolesEnum.BCC]: "Blind Carbon Copy Recipient",
  [RolesEnum.CC]: "Carbon Copy Recipient",
  [RolesEnum.DRAFTER]: "Drafter",
  [RolesEnum.FORWARDED_RECIPIENT]: "Forwarded Recipient",
  [RolesEnum.FORWARDER]: "Forwarder",
  [RolesEnum.RECIPIENT]: "Recipient",
  [RolesEnum.DRAFT_REVIEWER]: "Draft Reviewer",
  [RolesEnum.SENDER]: "Sender",
  [RolesEnum.WORKFLOW_MANAGER]: "Workflow Manager",
};

export default roleDictionary;
