"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  selectStatus,
  updateSubject,
} from "@/lib/features/letter/letterSlice";
import { ContactType } from "@/typing/interface";
import { ParticipantRolesEnum, RequestStatusEnum } from "@/typing/enum";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { RichTextEditor } from "@/components/shared/Editor";
import { FileUploadButton, SelectableInput } from "@/components/shared";
import { toggleIsReadOnly } from "@/lib/features/ui/uiManagerSlice";

interface IFormConfig {
  label: string;
  name: ParticipantRolesEnum;
  isCreatable: boolean;
  isMulti: boolean;
  placeholder: string;
  defaultValue?: ContactType[];
}

const internalLetterFormConfig: IFormConfig[] = [
  {
    label: "ለ",
    name: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ግልባጭ",
    name: ParticipantRolesEnum["CARBON COPY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
    placeholder: "የካርቦን ቅጂ ተቀባዮችን ያስገቡ...",
  },
  {
    label: "እንዲያዉቁት",
    name: ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
    placeholder: "እንዲያዉቁት የሚገባቸው ተቀባዮችን ያስገቡ...",
  },
];

const incomingLetterFormConfig: IFormConfig[] = [
  {
    label: "ከ",
    name: ParticipantRolesEnum.AUTHOR,
    isCreatable: true,
    isMulti: true,
    placeholder: "የደብዳቤውን ላኪ ያስገቡ...",
  },
  {
    label: "ለ",
    name: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ግልባጭ",
    name: ParticipantRolesEnum["CARBON COPY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "የካርቦን ቅጂ ተቀባዮችን ያስገቡ...",
  },
  {
    label: "እንዲያዉቁት",
    name: ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "እንዲያዉቁት የሚገባቸው ተቀባዮችን ያስገቡ...",
  },
];

const outgoingLetterFormConfig: IFormConfig[] = [
  {
    label: "ለ",
    name: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ግልባጭ",
    name: ParticipantRolesEnum["CARBON COPY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "የካርቦን ቅጂ ተቀባዮችን ያስገቡ...",
  },
  {
    label: "እንዲያዉቁት",
    name: ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "እንዲያዉቁት የሚገባቸው ተቀባዮችን ያስገቡ...",
  },
];

export default function LetterComposeForm() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const contacts = useAppSelector(selectContacts);
  const status = useAppSelector(selectStatus);
  const [formConfig, setFormConfig] = useState<IFormConfig[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === RequestStatusEnum.LOADING) {
      dispatch(toggleIsReadOnly(true));
    }
  }, [status]);

  const isIncomingLetter =
    letterDetail?.letter_type === "incoming" ? true : false;

  useEffect(() => {
    switch (letterDetail?.letter_type) {
      case "incoming":
        setFormConfig(incomingLetterFormConfig);
        break;
      case "outgoing":
        setFormConfig(outgoingLetterFormConfig);
        break;
      default:
        setFormConfig(internalLetterFormConfig);
        break;
    }
  }, [letterDetail]);

  return (
    <form className="p-2 flex gap-2 flex-col ">
      {formConfig.map(({ label, ...rest }) => (
        <div key={label} className="flex items-center gap-1.5">
          <Label className="w-20">{label}</Label>
          <SelectableInput options={contacts} {...rest} />
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <Label className="w-20" htmlFor="ጉዳይ">
          ጉዳይ
        </Label>
        <Input
          type="text"
          id="ጉዳይ"
          className="w-full bg-white outline-gray-300"
          value={letterDetail?.subject || ""}
          onChange={(e) => dispatch(updateSubject(e.target.value))}
        />
      </div>
      {isIncomingLetter ? null : <RichTextEditor />}
      <FileUploadButton />
    </form>
  );
}
