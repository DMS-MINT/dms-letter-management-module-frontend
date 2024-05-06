import { Main } from "@/components/layouts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function LetterDetail() {
  const readOnly: boolean = true;
  return (
    <section className="grid gap-5 h-fit pb-5 flex-1">
      <Main>
        <section className="flex flex-col gap-5">
          <section className="flex flex-col gap-5">
            <h2 className="font-semibold text-lg">የላኪ መረጃ</h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የተቀባይ ስም">ሙሉ ስም</Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="አማረ ተፈሪ "
                />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የተቀባይ ስም">የስራ መደቡ መጠሪያ</Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="የገበያ ስራ አስኪያጅ"
                />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የተቀባይ ስም">አድራሻ</Label>
                <Input disabled={readOnly} type="text" id="የተቀባይ ስም" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የተቀባይ ስም">ስልክ ቁጥር</Label>
                <Input disabled={readOnly} type="text" id="የተቀባይ ስም" />
              </div>
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የተቀባይ ስም">ፖስታ ቁጥር</Label>
                <Input disabled={readOnly} type="text" id="የተቀባይ ስም" />
              </div>
            </div>
          </section>
          <Separator />
          <section className="flex flex-col gap-5">
            <h2 className="font-semibold text-lg">ስለ ደብዳቤው መረጃ</h2>
            <div className="grid grid-cols-2 gap-5">
              <div className="grid items-center gap-1.5">
                <Label htmlFor="የተቀባይ ስም">ርዕሰ ጉዳይ</Label>
                <Input
                  disabled={readOnly}
                  type="text"
                  id="የተቀባይ ስም"
                  value="በመንግስት አገልግሎቶች ውስጥ የቴክኖሎጂ ፈጠራ እድሎችን ማሰስ"
                />
              </div>
            </div>
          </section>
        </section>
      </Main>

      <Main>
        <section>
          <h2 className="font-semibold text-lg">የተያያዘ ፋይል</h2>
        </section>
      </Main>
      <Main>
        <section className="flex flex-col gap-1.5">
          <h2 className="font-semibold text-lg">ደብዳቤ</h2>
          <Textarea
            id="ደብዳቤ"
            disabled={readOnly}
            className="bg-gray-100 h-[500px]"
            value="ውድ [የተቀባዩ ስም]፣ይህ መልእክት በደንብ እንደሚያገኝህ ተስፋ"
          />
        </section>
      </Main>
      <Main>
        <section className="h-52 flex flex-col justify-between cursor-pointer hover:backdrop-brightness-95">
          <h2 className="font-semibold text-lg">የፊርማ ሰሌዳ</h2>
          <p className="self-center text-gray-600 ">
            እዚህ ጠቅ ያድርጉ እና ፊርማዎን ለማስገባት እባክዎን የፊርማ ሰሌዳ ይጠቀሙ
          </p>
          <Separator className="bg-gray-900" />
        </section>
      </Main>
    </section>
  );
}
