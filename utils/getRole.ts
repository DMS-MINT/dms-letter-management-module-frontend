import { RolesEnum } from "@/typing/enum";

export const RoleLabels: { [key: number]: string } = {
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

export function getRole(name: any) {
  const LabelRoles: Record<string, RolesEnum> = Object.fromEntries(
    Object.entries(RoleLabels).map(([key, value]) => [value, parseInt(key)])
  );

  // Get the uppercase label from actionMeta.name
  const uppercaseLabel = name?.toUpperCase();

  // Check if uppercaseLabel is valid and exists in the reverse mapping
  if (uppercaseLabel && LabelRoles.hasOwnProperty(uppercaseLabel)) {
    const enumValue = LabelRoles[uppercaseLabel];
    return enumValue;
  }
}
