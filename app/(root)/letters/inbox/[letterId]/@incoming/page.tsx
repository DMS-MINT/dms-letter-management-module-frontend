"use client";
import { Main } from "@/components/layouts";
import CommentSection from "@/components/layouts/Comment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

export default function LetterDetail() {
  const readOnly: boolean = true;

  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <Main>
        <h2 className="font-semibold text-lg">የ ደብዳቤው ተሳታፊወች</h2>
        <div className="grid-flow-row grid-cols-1 gap-5 box-border shadow-lg  p-4">
          <div className="flex items-center gap-1.5">
            <Label className="w-20" htmlFor="የተቀባይ ስም">
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
            <Label className="w-20" htmlFor="የተቀባይ ስም">
              ለ
            </Label>
            <Input
              disabled={readOnly}
              type="text"
              id="የተቀባይ ስም"
              value="የገበያ ስራ አስኪያጅ"
              className="w-full mb-2"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <Label className="w-20" htmlFor="ግልባጭ">
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
            <Label className="w-20" htmlFor="ግልባጭ">
              እንዲያዉቁት
            </Label>
            <Input
              disabled={readOnly}
              type="text"
              value="የዲጂታል ኢኮኖሚ ልማት ክፍል"
              id="ግልባጭ"
              className="w-full mb-2"
            />
          </div>
        </div>
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
          {/* <CommentSection comments={[]} /> */}
        </section>
      </Main>
    </section>
  );
}
