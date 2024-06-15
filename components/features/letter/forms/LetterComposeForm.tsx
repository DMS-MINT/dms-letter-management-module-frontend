/** @format */

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  updateSubject,
} from "@/lib/features/letter/letterSlice";
import { contactToOption } from "@/utils";
import { IOption } from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { SelectableInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Editor from "../../../shared/TextEditor";

interface IFormConfig {
  label: string;
  participantRole: ParticipantRolesEnum;
  isCreatable: boolean;
  isMulti: boolean;
  placeholder: string;
}

const internalLetterFormConfig: IFormConfig[] = [
  {
    label: "ከ",
    participantRole: ParticipantRolesEnum.AUTHOR,
    isCreatable: false,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ለ",
    participantRole: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ግልባጭ",
    participantRole: ParticipantRolesEnum["Carbon Copy Recipient"],
    isCreatable: false,
    isMulti: true,
    placeholder: "የካርቦን ቅጂ ተቀባዮችን ያስገቡ...",
  },
  {
    label: "እንዲያዉቁት",
    participantRole: ParticipantRolesEnum["Blind Carbon Copy Recipient"],
    isCreatable: false,
    isMulti: true,
    placeholder: "እንዲያዉቁት የሚገባቸው ተቀባዮችን ያስገቡ...",
  },
];
const incomingLetterFormConfig: IFormConfig[] = [
  {
    label: "ከ",
    participantRole: ParticipantRolesEnum.AUTHOR,
    isCreatable: true,
    isMulti: true,
    placeholder: "የደብዳቤውን ላኪ ያስገቡ...",
  },
  {
    label: "ለ",
    participantRole: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ግልባጭ",
    participantRole: ParticipantRolesEnum["Carbon Copy Recipient"],
    isCreatable: true,
    isMulti: true,
    placeholder: "የካርቦን ቅጂ ተቀባዮችን ያስገቡ...",
  },
  {
    label: "እንዲያዉቁት",
    participantRole: ParticipantRolesEnum["Blind Carbon Copy Recipient"],
    isCreatable: true,
    isMulti: true,
    placeholder: "እንዲያዉቁት የሚገባቸው ተቀባዮችን ያስገቡ...",
  },
];
const outgoingLetterFormConfig: IFormConfig[] = [
  {
    label: "ከ",
    participantRole: ParticipantRolesEnum.AUTHOR,
    isCreatable: true,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ለ",
    participantRole: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: true,
    isMulti: true,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
  {
    label: "ግልባጭ",
    participantRole: ParticipantRolesEnum["Carbon Copy Recipient"],
    isCreatable: true,
    isMulti: true,
    placeholder: "የካርቦን ቅጂ ተቀባዮችን ያስገቡ...",
  },
  {
    label: "እንዲያዉቁት",
    participantRole: ParticipantRolesEnum["Blind Carbon Copy Recipient"],
    isCreatable: true,
    isMulti: true,
    placeholder: "እንዲያዉቁት የሚገባቸው ተቀባዮችን ያስገቡ...",
  },
];

export default function LetterComposeForm() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const contacts = useAppSelector(selectContacts);
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<IOption[]>([]);
  const [formConfig, setFormConfig] = useState<IFormConfig[]>([]);

  const isIncomingLetter =
    letterDetail.letter_type === "incoming" ? true : false;

  useEffect(() => {
    switch (letterDetail.letter_type) {
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
  }, [letterDetail.letter_type]);

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        return contactToOption(contact);
      });

      setOptions(options);
    }
  }, [contacts]);

  return (
 <form className='p-2 flex gap-2 flex-col w-[240mm] ml-24 overflow-auto'>
      {isIncomingLetter ? (
        <div className='flex items-center gap-1.5'>
          <Label className='w-20'>ከ</Label>
          <SelectableInput
            options={options}
            role={ParticipantRolesEnum.Sender}
            isCreatable={true}
            isMulti={true}
            placeholder='የደብዳቤውን ላኪ ያስገቡ...'
          />
        </div>
      ) : null}
      {formConfig.map(
        ({ label, participantRole, isCreatable, isMulti, placeholder }) => (
          <div key={label} className='flex items-center gap-1.5'>
            <Label className='w-20'>{label}</Label>
            <SelectableInput
              options={options}
              role={participantRole}
              isCreatable={isCreatable}
              isMulti={isMulti}
              placeholder={placeholder}
            />
          </div>
        )
      )}
      <div className='flex items-center gap-1.5'>
        <Label className='w-20' htmlFor='ጉዳይ'>
          ጉዳይ
        </Label>
        <Input
          type='text'
          id='ጉዳይ'
          className='w-full bg-white '
          value={letterDetail.subject || ""}
          onChange={(e) => dispatch(updateSubject(e.target.value))}
        />
      </div>
      {isIncomingLetter ? null : <Editor />}

      <Button variant='outline' className='flex gap-2 w-fit mt-4'>
        <Plus size={19} />
        ፋይል አያይዝ
      </Button>
    </form>
  );
}
