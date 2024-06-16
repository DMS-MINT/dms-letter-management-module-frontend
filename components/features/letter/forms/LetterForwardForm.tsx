"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { IOption, IParticipantInputSerializer } from "@/typing/interface";
import { contactToOption } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";

interface IFormData {
  to: string;
  message: string;
}

export default function LetterForwardForm() {
  const [formData, setFormData] = useState<IFormData>({
    to: "",
    message: "",
  });
  const contacts = useAppSelector(selectContacts);
  const [options, setOptions] = useState<IOption[]>([]);

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

  const handleSelectChange = (
    option: SingleValue<IOption> | MultiValue<IOption>,
    actionMeta: ActionMeta<IOption>
  ) => {
    const { name, option: selectedOption } = actionMeta;

    const to = selectedOption?.value as string;

    setFormData((prevData: IFormData) => ({ ...prevData, to }));
  };

  const handleMessageChange = (message: string) => {
    setFormData((prevData: IFormData) => ({ ...prevData, message }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Label className="w-5">ለ</Label>
        <Select
          isMulti
          onChange={handleSelectChange}
          options={options}
          placeholder=""
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Label>መልእክት ማስቀመጫ</Label>
        <Textarea
          id="መልእክት ማስቀመጫ"
          className="bg-gray-100"
          value={formData.message || ""}
          onChange={(e) => handleMessageChange(e.target.value)}
        />
      </div>
    </>
  );
}
