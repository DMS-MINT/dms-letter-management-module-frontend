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
import { IOption, IParticipantInputSerializer } from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { LetterDetailSkeleton, SelectableInput } from "@/components/shared";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";

interface IParticipantState {
  role_name: ParticipantRolesEnum;
  user: IOption;
}

interface ILetterParticipantOption {
  label: string;
  participantRole: ParticipantRolesEnum;
  isCreatable: boolean;
  isMulti: boolean;
}

const letterParticipantOptions: ILetterParticipantOption[] = [
  {
    label: "ከ",
    participantRole: ParticipantRolesEnum.AUTHOR,
    isCreatable: false,
    isMulti: true,
  },
  {
    label: "ለ",
    participantRole: ParticipantRolesEnum["PRIMARY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
  },
  {
    label: "ግልባጭ",
    participantRole: ParticipantRolesEnum["CARBON COPY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
  },
  {
    label: "እንዲያዉቁት",
    participantRole: ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"],
    isCreatable: false,
    isMulti: true,
  },
];

export default function LetterDetail() {
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);
  const permissions = useAppSelector(selectPermissions);
  const contacts = useAppSelector(selectContacts);
  const [options, setOptions] = useState<IOption[]>([]);
  const [participants, setParticipants] = useState<IParticipantState[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.referenceNumber) {
      dispatch(getLetterDetails(params.referenceNumber as string));
    }
  }, [params, dispatch]);

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        const id = uuidv4();
        const user = contact;
        const data = { id, user } as IParticipantInputSerializer;
        return contactToOption(data);
      });

      setOptions(options);
    }
  }, [contacts]);

  useEffect(() => {
    if (letterDetails.participants.length > 0) {
      const options: IParticipantState[] = [];

      letterDetails.participants.map((participant) => {
        const option = contactToOption(participant);

        options.push({ role_name: participant.role_name, user: option });
      });
      setParticipants(options);
    }
  }, [letterDetails.participants]);

  if (
    Object.keys(permissions).length === 0 ||
    !(letterDetails?.participants?.length > 0)
  ) {
    return <LetterDetailSkeleton />;
  }

  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <section className="card">
        <h2 className="font-semibold text-lg">የ ደብዳቤው ተሳታፊወች</h2>
        <section className="p-2 flex gap-2 flex-col">
          {letterParticipantOptions.map(
            ({ label, participantRole, isCreatable, isMulti }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Label className="w-20">{label}</Label>
                <SelectableInput
                  defaultValue={getDefaultValue(participants, participantRole)}
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
                  value={letterDetails.subject ? letterDetails.subject : ""}
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
            letterDetails.letter_type !== "incoming" ? (
              <section className="flex flex-col gap-1.5">
                <Label htmlFor="ጉዳዩ">ደብዳቤ</Label>
                <Textarea
                  id="ደብዳቤ"
                  className="bg-gray-100 h-[500px]"
                  value={letterDetails.content ? letterDetails.content : ""}
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
