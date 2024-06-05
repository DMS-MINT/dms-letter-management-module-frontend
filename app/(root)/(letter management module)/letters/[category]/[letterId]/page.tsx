"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getLetterDetails,
  selectLetterDetails,
  updateContent,
  updateSubject,
} from "@/lib/features/letter/letterSlice";
import { contactToOption, getDefaultValue } from "@/utils";
import { IOption, ParticipantRolesEnum } from "@/typing";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { LetterDetailSkeleton, SelectableInput } from "@/components/shared";
import { useParams } from "next/navigation";

interface IParticipantState {
  role: string;
  user: IOption;
}

interface ILetterParticipantOption {
  label: string;
  filterBy: string;
  participantRole: number;
  isCreatable: boolean;
  isMulti: boolean;
}

const letterParticipantOptions: ILetterParticipantOption[] = [
  {
    label: "ከ",
    filterBy: "Sender",
    participantRole: ParticipantRolesEnum.Sender,
    isCreatable: false,
    isMulti: false,
  },
  {
    label: "ለ",
    filterBy: "Recipient",
    participantRole: ParticipantRolesEnum.Sender,
    isCreatable: false,
    isMulti: true,
  },
  {
    label: "ግልባጭ",
    filterBy: "Carbon Copy Recipient",
    participantRole: ParticipantRolesEnum.Sender,
    isCreatable: false,
    isMulti: true,
  },
  {
    label: "እንዲያዉቁት",
    filterBy: "Blind Carbon Copy Recipient",
    participantRole: ParticipantRolesEnum.Sender,
    isCreatable: false,
    isMulti: true,
  },
];

export default function LetterDetail() {
  const dispatch = useAppDispatch();
  const letter = useAppSelector(selectLetterDetails);
  const contacts = useAppSelector(selectContacts);
  const [options, setOptions] = useState<IOption[]>([]);
  const [participants, setParticipants] = useState<IParticipantState[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.letterId) {
      dispatch(getLetterDetails(params.letterId as string));
    }
  }, [params, dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        return contactToOption(contact);
      });

      setOptions(options);
    }
  }, [contacts]);

  useEffect(() => {
    if (Object.keys(letter).length !== 0) {
      if (letter.participants.length > 0) {
        const options: IParticipantState[] = [];

        letter.participants.map((participant) => {
          const option = contactToOption(participant.user);

          options.push({ role: participant.role, user: option });
        });

        setParticipants(options);
      }
    }
  }, [letter, dispatch]);

  if (participants.length === 0) {
    return <LetterDetailSkeleton />;
  }

  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <section className="card">
        <h2 className="font-semibold text-lg">የ ደብዳቤው ተሳታፊወች</h2>
        <section className="p-2 flex gap-2 flex-col">
          {letterParticipantOptions.map(
            ({ label, filterBy, participantRole, isCreatable, isMulti }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Label className="w-20">{label}</Label>
                <SelectableInput
                  defaultValue={getDefaultValue(participants, filterBy)}
                  options={options}
                  role={participantRole}
                  isCreatable={isCreatable}
                  isMulti={isMulti}
                />
              </div>
            )
          )}
        </section>
      </section>
      <section className="card">
        <section className="flex flex-col gap-5">
          <h2 className="font-semibold text-lg">ስለ ደብዳቤው መረጃ</h2>
          <div className="grid  gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="ጉዳዩ">ጉዳዩ</Label>
                <Input
                  type="text"
                  id="ጉዳዩ"
                  value={letter.subject ? letter.subject : ""}
                  onChange={(e) => dispatch(updateSubject(e.target.value))}
                />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የገጾች ብዛት">የገጾች ብዛት</Label>
                <Input readOnly type="text" id="የገጾች ብዛት" value="1" />
              </div>
            </div>
          </div>
          {
            letter.letter_type !== "incoming" ? (
              <section className="flex flex-col gap-1.5">
                <Label htmlFor="ጉዳዩ">ደብዳቤ</Label>
                <Textarea
                  id="ደብዳቤ"
                  className="bg-gray-100 h-[500px]"
                  value={letter.content ? letter.content : ""}
                  onChange={(e) => dispatch(updateContent(e.target.value))}
                />
              </section>
            ) : null
            // <section className="flex flex-col gap-1.5">
            //   <Label htmlFor="ጉዳዩ">የተያያዘ ፋይል</Label>
            //   <p>Attachment Will be displayed here</p>
            // </section>
          }
        </section>
      </section>
    </section>
  );
}
