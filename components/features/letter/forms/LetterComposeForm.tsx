"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  selectStatus,
  updateContent,
  updateSubject,
} from "@/lib/features/letter/letterSlice";
import { contactToOption } from "@/utils";
import { IOption, LetterType } from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { SelectableInput } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface ILetterComposeFormProps {
  letterType: LetterType;
}

interface ILetterParticipantOption {
  label: string;
  participantRole: number;
  isCreatable: boolean;
  isMulti: boolean;
  placeholder: string;
}

const letterParticipantOptions: ILetterParticipantOption[] = [
  {
    label: "ለ",
    participantRole: ParticipantRolesEnum.Recipient,
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

export default function LetterComposeForm({
  letterType,
}: ILetterComposeFormProps) {
  const letterDetail = useAppSelector(selectLetterDetails);
  const contacts = useAppSelector(selectContacts);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [options, setOptions] = useState<IOption[]>([]);

  const isIncomingLetter = letterType === "incoming" ? true : false;

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        return contactToOption(contact);
      });

      setOptions(options);
    }
  }, [contacts]);

  return (
    <form className="p-2 flex gap-2 flex-col ">
      {isIncomingLetter ? (
        <div className="flex items-center gap-1.5">
          <Label className="w-20">ከ</Label>
          <SelectableInput
            options={options}
            role={ParticipantRolesEnum.Sender}
            isCreatable={true}
            isMulti={true}
            placeholder="የደብዳቤውን ላኪ ያስገቡ..."
          />
        </div>
      ) : null}

      {letterParticipantOptions.map(
        ({ label, participantRole, isCreatable, isMulti, placeholder }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Label className="w-20">{label}</Label>
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
      <div className="flex items-center gap-1.5">
        <Label className="w-20" htmlFor="ጉዳይ">
          ጉዳይ
        </Label>
        <Input
          type="text"
          id="ጉዳይ"
          className="w-full"
          value={letterDetail.subject || ""}
          onChange={(e) => dispatch(updateSubject(e.target.value))}
        />
      </div>
      {isIncomingLetter ? null : (
        <Textarea
          id="ደብዳቤ"
          className="bg-gray-100 h-[500px]"
          value={letterDetail.content || ""}
          onChange={(e) => dispatch(updateContent(e.target.value))}
        />
      )}
      <Button variant="outline" className="flex gap-2 w-fit mt-4">
        <Plus size={19} />
        ፋይል አያይዝ
      </Button>
    </form>
  );
}
