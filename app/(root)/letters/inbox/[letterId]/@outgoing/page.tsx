"use client";
import { Main } from "@/components/layouts";
import CommentSection from "@/components/layouts/Comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { RotateCw } from "lucide-react";
import { useRef, useState } from "react";

export default function LetterDetail() {
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
  const readOnly: boolean = true;
  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <Main>
        <section className="flex flex-col gap-5">
          <section className="flex flex-col gap-5">
            <h2 className="font-semibold text-lg">የ ደብዳቤው ተሳታፊወች</h2>
            <div className="grid-flow-row grid-cols-1 gap-5 box-border shadow-lg  p-4">
              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="የተቀባይ ስም">
                  ከ
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="አማረ ተፈሪ "
                  className="w-full mb-2"
                />
              </div>

              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="የተቀባይ ስም">
                  ለ
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="የገበያ ስራ አስኪያጅ"
                  className="w-full mb-2"
                />

                <div className="flex px-0 pr-0 w-relative">
                  <Button
                    variant="ghost"
                    onClick={() => addInputField("አድራሻ", 1)}
                    disabled={!isAddFieldEnabled1}
                  >
                    አድራሻ
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => addInputField("ስልክ ቁጥር", 2)}
                    disabled={!isAddFieldEnabled2}
                  >
                    ስልክ ቁጥር
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => addInputField("የፖስታ ቁጥር", 3)}
                    disabled={!isAddFieldEnabled3}
                  >
                    የፖስታ ቁጥር
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="ግልባጭ">
                  ግልባጭ
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  value="የዲጂታል ኢኮኖሚ ልማት ክፍል"
                  id="ግልባጭ"
                  className="w-full mb-2"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <Label className="w-1/12" htmlFor="እንዲያውቁት">
                  እንዲያውቁት
                </Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  value="ሚኒስቴር መስሪያ ቤት"
                  id="እንዲያውቁት"
                  className="w-full mb-2"
                />
              </div>
              <div className="items-center gap-6 ">
                {inputFields.map((field, index) => (
                  <div key={index} className="flex items-center gap-5">
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
              </div>
            </div>
          </section>
        </section>
      </Main>

      <Main>
        <section className="flex flex-col gap-5">
          <h2 className="font-semibold text-lg">ስለ ደብዳቤው መረጃ</h2>
          <div className="grid  gap-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="ጉዳዩ">ጉዳዩ</Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="ጉዳዩ"
                  value="የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ"
                />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የገጾች ብዛት">የገጾች ብዛት</Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የገጾች ብዛት"
                  value="1"
                />
              </div>
            </div>
          </div>
          <section className="flex flex-col gap-1.5">
            <Label htmlFor="ጉዳዩ">ደብዳቤ</Label>

            <Textarea
              id="ደብዳቤ"
              disabled={readOnly}
              className="bg-gray-100 h-[500px]"
              value="ውድ [የተቀባዩ ስም]፣ይህ መልእክት በደንብ እንደሚያገኝህ ተስፋ"
            />
          </section>
        </section>
      </Main>

      <CommentSection comments={[]} />
    </section>
  );
}
