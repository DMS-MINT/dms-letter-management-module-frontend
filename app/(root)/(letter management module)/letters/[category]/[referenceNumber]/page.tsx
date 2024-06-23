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
import {
  ContactType,
  IOption,
  IParticipantInputSerializer,
} from "@/typing/interface";
import { ParticipantRolesEnum } from "@/typing/enum";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { LetterDetailSkeleton, SelectableInput } from "@/components/shared";
import { useParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { RichTextEditor } from "@/components/shared/Editor";

interface IParticipantState {
  role: ParticipantRolesEnum;
  user: IOption;
}

interface ILetterParticipantOption {
  label: string;
  role: ParticipantRolesEnum;
  isCreatable: boolean;
  isMulti: boolean;
}

interface IFormConfig {
  label: string;
  name: ParticipantRolesEnum;
  isCreatable: boolean;
  isMulti: boolean;
  placeholder: string;
  defaultValue?: ContactType[];
}

// const letterParticipantOptions: ILetterParticipantOption[] = [
//   {
//     label: "ከ",
//     role: ParticipantRolesEnum.AUTHOR,
//     isCreatable: false,
//     isMulti: true,
//   },
//   {
//     label: "ለ",
//     role: ParticipantRolesEnum["PRIMARY RECIPIENT"],
//     isCreatable: false,
//     isMulti: true,
//   },
//   {
//     label: "ግልባጭ",
//     role: ParticipantRolesEnum["CARBON COPY RECIPIENT"],
//     isCreatable: false,
//     isMulti: true,
//   },
//   {
//     label: "እንዲያዉቁት",
//     role: ParticipantRolesEnum["BLIND CARBON COPY RECIPIENT"],
//     isCreatable: false,
//     isMulti: true,
//   },
// ];
const internalLetterFormConfig: IFormConfig[] = [
  {
    label: "ከ",
    name: ParticipantRolesEnum.AUTHOR,
    isCreatable: false,
    isMulti: false,
    placeholder: "ተቀባዮችን ያስገቡ...",
  },
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
    label: "ከ",
    name: ParticipantRolesEnum.AUTHOR,
    isCreatable: false,
    isMulti: false,
    placeholder: "ተቀባዮችን ያስገቡ...",
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

export default function LetterDetail() {
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);
  const permissions = useAppSelector(selectPermissions);
  const contacts = useAppSelector(selectContacts);
  const [formConfig, setFormConfig] = useState<IFormConfig[]>([]);
  const params = useParams();

  useEffect(() => {
    if (params.referenceNumber) {
      dispatch(getLetterDetails(params.referenceNumber as string));
    }
  }, [params, dispatch]);

  useEffect(() => {
    switch (letterDetails.letter_type) {
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
  }, [letterDetails.letter_type]);

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
          {formConfig.map(({ label, ...rest }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Label className="w-20">{label}</Label>
              <SelectableInput
                defaultValue={getDefaultValue(
                  letterDetails.participants,
                  rest.name
                )}
                options={contacts}
                {...rest}
              />
            </div>
          ))}
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
                <RichTextEditor />
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
