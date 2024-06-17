"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectContacts } from "@/lib/features/contact/contactSlice";
import { IOption, IParticipantInputSerializer } from "@/typing/interface";
import { contactToOption } from "@/utils";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { shareLetter } from "@/lib/features/letter/workflow/workflowSlice";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";

interface IFormData {
  to: string;
  message: string;
}

export default function ShareLetterForm() {
  const [formData, setFormData] = useState<IFormData>({
    to: "",
    message: "",
  });
  const contacts = useAppSelector(selectContacts);
  const [options, setOptions] = useState<IOption[]>([]);
  const dispatch = useAppDispatch();
  const letterDetails = useAppSelector(selectLetterDetails);

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
    dispatch(
      shareLetter({
        reference_number: letterDetails.reference_number,
        participant: formData,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>ደብዳቤውን አጋራ</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[40rem] max-w-[40rem] max-h-[40rem] flex flex-col">
        <DialogHeader className="flex-1 p-2">
          <DialogTitle>የደብዳቤ መምሪያ</DialogTitle>
          <div className="flex items-center gap-1.5 py-3">
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
        </DialogHeader>
        <DialogFooter className="">
          <Button variant={"outline"}>ሰርዝ</Button>
          <Button onClick={handleSubmit}>ምራ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
