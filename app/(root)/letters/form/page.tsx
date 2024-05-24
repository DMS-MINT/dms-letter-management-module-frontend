"use client";

import React, { useState } from "react";
import Select, { SingleValue, ActionMeta, MultiValue } from "react-select";

import CreatableSelect from "react-select/creatable";

interface IMember {
  id: string;
  user_type: "member";
}
interface IGuest {
  name: string;
  user_type: "guest";
}

interface IParticipantInputSerializer {
  role: string;
  message: string;
  user: IMember | IGuest;
}

enum Roles {
  BCC = 1,
  CC = 2,
  DRAFTER = 3,
  FORWARDED_RECIPIENT = 4,
  FORWARDER = 5,
  RECIPIENT = 6,
  DRAFT_REVIEWER = 7,
  SENDER = 8,
  WORKFLOW_MANAGER = 9,
}

// Reverse mapping for Roles enum
const RoleLabels: { [key: number]: string } = {
  [Roles.BCC]: "Blind Carbon Copy Recipient",
  [Roles.CC]: "Carbon Copy Recipient",
  [Roles.DRAFTER]: "Drafter",
  [Roles.FORWARDED_RECIPIENT]: "Forwarded Recipient",
  [Roles.FORWARDER]: "Forwarder",
  [Roles.RECIPIENT]: "Recipient",
  [Roles.DRAFT_REVIEWER]: "Draft Reviewer",
  [Roles.SENDER]: "Sender",
  [Roles.WORKFLOW_MANAGER]: "Workflow Manager",
};

export interface IUserOptions {
  readonly value: string;
  readonly label: string;
  readonly user_type: "member" | "guest";
}

export const userOptions: readonly IUserOptions[] = [
  { value: "1", label: "John Doe", user_type: "member" },
  { value: "2", label: "Jane Smith", user_type: "member" },
  { value: "3", label: "Acme Corp", user_type: "guest" },
  { value: "4", label: "Michael Johnson", user_type: "member" },
  { value: "5", label: "Global Tech", user_type: "guest" },
  { value: "6", label: "Alice Johnson", user_type: "member" },
  { value: "7", label: "XYZ Corporation", user_type: "member" },
  { value: "8", label: "Innovate LLC", user_type: "guest" },
  { value: "9", label: "Jack White", user_type: "member" },
  { value: "10", label: "Silver Co", user_type: "member" },
];

export default function App() {
  const [participants, setParticipants] = useState<
    IParticipantInputSerializer[]
  >([]);

  const handleChange = (
    newValue: MultiValue<IUserOptions>,
    actionMeta: ActionMeta<IUserOptions>
  ) => {
    // Reverse map from labels to enum values
    const LabelRoles: Record<string, Roles> = Object.fromEntries(
      Object.entries(RoleLabels).map(([key, value]) => [value, parseInt(key)])
    );

    // Get the uppercase label from actionMeta.name
    const uppercaseLabel = actionMeta.name?.toUpperCase();

    // Check if uppercaseLabel is valid and exists in the reverse mapping
    if (uppercaseLabel && LabelRoles.hasOwnProperty(uppercaseLabel)) {
      const enumValue = LabelRoles[uppercaseLabel];
      console.log(enumValue);
    } else {
      console.log("Invalid label or label not found in reverse mapping.");
    }

    console.log(actionMeta);
  };

  return (
    <div className="mx-20 p-10">
      <CreatableSelect
        isMulti
        name={RoleLabels[Roles.RECIPIENT]}
        options={userOptions}
        onChange={handleChange}
      />
      <CreatableSelect
        isMulti
        name={RoleLabels[Roles.RECIPIENT]}
        options={userOptions}
        onChange={handleChange}
      />
    </div>
  );
}
