/** @format */
"use client";
// import Editor from "./editor";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Ghost, Plus } from "lucide-react";
import React, { useState, useMemo } from "react";
import Comment from "./comment";
import Seal from "./seal";
// import Editor from "./editor";

export default function OutgoingLetterForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="rounded-lg bg-card text-card-foreground shadow-sm p-6 h-full">
      <form
        className="flex flex-col mr-4 gap-4 text-card-foreground shadow-sm p-6 h-full mb-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex items-center gap-1.5">
          <Label className="w-1/12 pr-14" htmlFor="ለ">
            ለ
          </Label>
          <Input type="text" id="ለ" className="w-full" />
          <div className="flex px-0 pr-0 w-relative">
            <Button
              variant="ghost"
              onClick={() => addInputField("አድራሻ", 1)}
              // disabled={!isAddFieldEnabled1}
            >
              አድራሻ
            </Button>
            <Button
              variant="ghost"
              onClick={() => addInputField("ስልክ ቁጥር", 2)}
              // disabled={!isAddFieldEnabled2}
            >
              ስልክ ቁጥር
            </Button>
            <Button
              variant="ghost"
              onClick={() => addInputField("የፖስታ ቁጥር", 3)}
              // disabled={!isAddFieldEnabled3}
            >
              የፖስታ ቁጥር
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Label className="w-1/12" htmlFor="ግልባጭ">
            ግልባጭ
          </Label>
          <Input type="text" id="ግልባጭ" className="w-full" />
        </div>
        <div className="flex items-center gap-1.5">
          <Label className="w-1/12" htmlFor="እንዲያውቁት">
            እንዲያውቁት
          </Label>
          <Input type="text" id="እንዲያውቁት" className="w-full " />
        </div>
        <div className="flex items-center gap-1.5">
          <Label className="w-1/12" htmlFor="ጉዳይ">
            ጉዳይ
          </Label>
          <Input type="text" id="ጉዳይ" className="w-full" />
        </div>
        {/* <div className='flex grid-col-3 items-center gap-1.5 '> */}
        {inputFields.map((field, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <Label className="w-1/12" htmlFor={`inputField-${index}`}>
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
            {/* <h2 className="font-semibold text-lg">ደብዳቤ</h2> */}

            <Textarea id="ደብዳቤ" className="bg-gray-100 h-[500px]" />
          </section>
          {/* <Editor /> */}
        </div>
        {/* <Seal /> */}
        <Button
          variant="outline"
          className="flex gap-2 w-fit mt-32"
          onClick={handleClick}
        >
          <Plus size={19} />
          ፋይል አያይዝ
        </Button>
        {/* <Comment comments={[]} /> */}
      </form>
    </div>
  );
}
