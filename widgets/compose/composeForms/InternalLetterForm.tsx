"use client";

import { useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { ParticipantRolesEnum } from "@/typing";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { contactToOption } from "@/utils";
import { IOption } from "@/typing";
import { SelectableInput } from "@/components/shared";
import {
  selectLetterDetails,
  updateContent,
  updateSubject,
} from "@/lib/features/letter/letterSlice";

export default function InternalLetterForm() {
  const [options, setOptions] = useState<IOption[]>([]);
  const contacts = useAppSelector(selectContacts);
  const letterDetails = useAppSelector(selectLetterDetails);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contacts.length > 0) {
      const options: IOption[] = contacts.map((contact) => {
        return contactToOption(contact);
      });

      setOptions(options);
    }
  }, [contacts]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [inputFields, setInputFields] = useState<
    { label: string; value: string }[]
  >([]);
  const [newlyAddedIndex, setNewlyAddedIndex] = useState(-1);
  const [isAddFieldEnabled1, setIsAddFieldEnabled1] = useState(true);
  const [isAddFieldEnabled2, setIsAddFieldEnabled2] = useState(true);
  const [isAddFieldEnabled3, setIsAddFieldEnabled3] = useState(true);

  const addInputField = (label: string, buttonNumber: number) => {
    const newField = { label, value: "" };
    setInputFields((prevFields) => {
      const newFields = [...prevFields, newField];
      setNewlyAddedIndex(newFields.length - 1);
      return newFields;
    });
    switch (buttonNumber) {
      case 1:
        setIsAddFieldEnabled1(false);
        break;
      case 2:
        setIsAddFieldEnabled2(false);
        break;
      case 3:
        setIsAddFieldEnabled3(false);
        break;
      default:
        break;
    }
  };
  const removeInputField = (index: number) => {
    setInputFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };
  const handleInputChange = (index: number, value: string) => {
    setInputFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index].value = value;
      return updatedFields;
    });
  };

  return (
    <form
      className="flex flex-col pl-2 gap-4 h-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-1.5">
        <Label className="w-20 pr-14">ለ</Label>
        <SelectableInput
          options={options}
          role={ParticipantRolesEnum.Recipient}
          isCreatable={false}
          isMulti={true}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <Label className="w-20">ግልባጭ</Label>
        <SelectableInput
          options={options}
          role={ParticipantRolesEnum["Carbon Copy Recipient"]}
          isCreatable={false}
          isMulti={true}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Label className="w-20">እንዲያውቁት</Label>
        <SelectableInput
          options={options}
          role={ParticipantRolesEnum["Blind Carbon Copy Recipient"]}
          isCreatable={false}
          isMulti={true}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Label className="w-20">ጉዳይ</Label>
        <Input
          type="text"
          id="ጉዳይ"
          className="w-full"
          value={letterDetails.subject}
          onChange={(e) => dispatch(updateSubject(e.target.value))}
        />
      </div>
      {inputFields.map((field, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <Label className="w-20" htmlFor={`inputField-${index}`}>
            {field.label}
          </Label>
          <Input
            type="text"
            id={`inputField-${index}`}
            className="w-full"
            value={field.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => removeInputField(index)}>ሰርዝ</button>
        </div>
      ))}

      <Input type="file" ref={fileInputRef} className="hidden" />

      <div className="flex flex-col mt-4 gap-1.5 w-full h-full">
        <section className="flex flex-col gap-1.5">
          <h2 className="font-semibold text-lg">ደብዳቤ</h2>

          <Textarea
            id="ደብዳቤ"
            className="bg-gray-100 h-[500px]"
            value={letterDetails.content}
            onChange={(e) => dispatch(updateContent(e.target.value))}
          />
          <Button
            variant="outline"
            className="flex gap-2 w-fit mt-3"
            onClick={handleClick}
          >
            <Plus size={19} />
            ፋይል አያይዝ
          </Button>
        </section>
      </div>
    </form>
  );
}
