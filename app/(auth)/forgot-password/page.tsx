import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <section className="flex flex-col gap-7">
      <div>
        <h2 className="text-gray-900 font-medium text-xl mt-5 mb-2">
          የይለፍ ቃልዎን ረስተዋል?
        </h2>
        <p className="text-gray-700 font-light text-sm">
          የይለፍ ቃልዎን ደህንነቱ በተጠበቀ ሁኔታ ዳግም ለማስጀመር የተጠቃሚ መለያዎን ከዚህ በታች ያስገቡ።
        </p>
      </div>
      <form className="flex flex-col gap-5 ">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="የላኪ ፖስታ ቁጥር">የተጠቃሚ መለያዎን ያስገቡ</Label>
          <Input type="text" id="የላኪ ፖስታ ቁጥር" />
        </div>
        <Link href="forgot-password/verify">
          <Button variant="secondary" className="w-full">
            ቀጥል
          </Button>
        </Link>
      </form>
      <div className="flex justify-between items-center">
        <Link href="/signin">
          <Button variant="outline" className="flex gap-2 items-center ">
            <ChevronLeft size={20} />
            ተመለስ
          </Button>
        </Link>
        <Button variant="link" className="p-0 h-fit text-base">
          የተጠቃሚ መታወቂያዎን ማስታወስ አይችሉም?
        </Button>
      </div>
    </section>
  );
}
