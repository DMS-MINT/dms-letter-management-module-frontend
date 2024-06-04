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
import { contactToOption } from "@/utils";
import { IOption, ParticipantRolesEnum } from "@/typing";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { SelectableInput } from "@/components/shared";

interface IParticipantState {
  role: string;
  user: IOption;
}

export default function LetterDetail() {
  const dispatch = useAppDispatch();
  const letter = useAppSelector(selectLetterDetails);
  const contacts = useAppSelector(selectContacts);
  const [options, setOptions] = useState<IOption[]>([]);
  const [participants, setParticipants] = useState<IParticipantState[]>([]);

  useEffect(() => {
    dispatch(getLetterDetails("68c0dfb0-26e8-41df-990d-0d554636a732"));
  }, []);

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        return contactToOption(contact);
      });

      setOptions(options);
    }
  }, [contacts]);

  useEffect(() => {
    if (letter.participants.length > 0) {
      const options: IParticipantState[] = [];

      letter.participants.map((participant) => {
        const option = contactToOption(participant.user);

        options.push({ role: participant.role, user: option });
      });

      setParticipants(options);
    }
  }, [letter]);

  if (participants.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <section className="card">
        <h2 className="font-semibold text-lg">የ ደብዳቤው ተሳታፊወች</h2>
        <div className="p-2 flex gap-2 flex-col">
          <div className="flex items-center gap-1.5">
            <Label className="w-20" htmlFor="የተቀባይ ስም">
              ከ
            </Label>
            <SelectableInput
              defaultValue={participants
                .filter((participant) => participant.role === "Sender")
                .map((participant) => participant.user)}
              options={options}
              role={ParticipantRolesEnum.Sender}
              isCreatable={true}
              isMulti={true}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Label className="w-20" htmlFor="የተቀባይ ስም">
              ለ
            </Label>
            <SelectableInput
              defaultValue={participants
                .filter((participant) => participant.role === "Recipient")
                .map((participant) => participant.user)}
              options={options}
              role={ParticipantRolesEnum.Recipient}
              isCreatable={true}
              isMulti={true}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Label className="w-20" htmlFor="ግልባጭ">
              ግልባጭ
            </Label>
            <SelectableInput
              defaultValue={participants
                .filter(
                  (participant) => participant.role === "Carbon Copy Recipient"
                )
                .map((participant) => participant.user)}
              options={options}
              role={ParticipantRolesEnum["Carbon Copy Recipient"]}
              isCreatable={true}
              isMulti={true}
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Label className="w-20" htmlFor="ግልባጭ">
              እንዲያዉቁት
            </Label>
            <SelectableInput
              defaultValue={participants
                .filter(
                  (participant) =>
                    participant.role === "Blind Carbon Copy Recipient"
                )
                .map((participant) => participant.user)}
              options={options}
              role={ParticipantRolesEnum["Blind Carbon Copy Recipient"]}
              isCreatable={true}
              isMulti={true}
            />
          </div>
        </div>
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
                <Input type="text" id="የገጾች ብዛት" value="1" />
              </div>
            </div>
          </div>
          <section className="flex flex-col gap-1.5">
            <Label htmlFor="ጉዳዩ">ደብዳቤ</Label>

            <Textarea
              id="ደብዳቤ"
              className="bg-gray-100 h-[500px]"
              value={letter.content ? letter.content : ""}
              onChange={(e) => dispatch(updateContent(e.target.value))}
            />
          </section>
        </section>
      </section>
    </section>
  );
}
