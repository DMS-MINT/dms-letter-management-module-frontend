"use client";
import { Main } from "@/components/layouts";
import TagInput from "react-tag-autocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
import CommentSection from "@/components/layouts/Comment";

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
          <section className="flex flex-col gap-1.5">
            <Label htmlFor="ጉዳዩ">ደብዳቤ</Label>

            <Textarea
              id="ደብዳቤ"
              disabled={readOnly}
              className="bg-gray-100 h-[500px]"
              value="ሰላም እና ለማንኛውም ወቅታዊ ተሸላሚ ውጤት ከአማርኛ እና ከቋንቋ በላይ ተጠቃሚ ያለው ይሆናል። ስለዚህም እኔ አባልነትህን ለመስራት በእርስዎ የምንለውን ልጆች ላይ በአንድ ላይ የሚደረገውን ሰው ማስተካከል ይችላል።
              
              በመንግሥትና በቅናሽ በኢንተርቨት ወቅታዊ እና በምሳሌው የተደረገ መረጃ ላይ እንደሚመለከተው ይጠቀምናል። እኔም ያስችላል።
              
              በዚህ ትምህርት በትክክል የተደረገውን የልጆችህን እንቅስቃሴና ቅርበት እንድታደርግ በመሆኑ እኔና የአባልነትህ አባል በሆነችው ጉዳይ ላይ በድምፅ ተከትለው አንዱ እንዲያስቀምጥ ነው። ስለዚህ እናም በምንጊዜም በእኔና በአንድ ላይ የሚቀመጡ መረጃዎችን ከመዝጋት የመዘጋጀውን ማሻሻል እንችላለን።
              
              በመሆኑም እኔና የአባልነትህ አባል እንደሆነች የምንመለከተውን አባል በማስመልከት ከእኔ የሚሰበስበውን እንደሚረዳ እንደወዳድር እንድማለፍ በመከታተል ላይ እንደሚያስችል ይገኛል።"
            />
          </section>
        </section>
      </Main>
      {/* <TagInput /> */}
      {/* <CommentSection comments={[]} /> */}
    </section>
  );
}
