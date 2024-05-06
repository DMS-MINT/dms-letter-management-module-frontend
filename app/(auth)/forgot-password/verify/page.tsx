import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function Verify() {
  const OTP_Array: number[] = [1, 2, 3, 4, 5, 6];

  return (
    <section className="flex flex-col gap-7">
      <div>
        <h2 className="text-gray-900 font-medium text-xl mt-5 mb-2">
          የተጠቃሚ መታወቂያው የእርስዎ መሆኑን ያረጋግጡ።
        </h2>
        <p className="text-gray-700 font-light text-sm">
          እባክህ የተላከልህን ባለ ስድስት አሃዝ ኮድ አስገባ።
        </p>
      </div>
      <form className="flex flex-col gap-9 ">
        <div className="grid grid-cols-6 gap-5">
          {OTP_Array.map((value) => (
            <Input
              key={value}
              type="number"
              id={`otpDigit${value}`}
              className="py-8 text-center text-4xl text-gray-900"
            />
          ))}
        </div>
        <Link href="/forgot-password/reset">
          <Button variant="secondary" className="w-full">
            አረጋግጥ
          </Button>
        </Link>
      </form>
      <div className="flex justify-between items-center">
        <Link href="/forgot-password">
          <Button variant="outline" className="flex gap-2 items-center ">
            <ChevronLeft size={20} />
            ተመለስ
          </Button>
        </Link>
        <Button variant="link" className="p-0 h-fit text-base">
          የማረጋገጫ ኮድ አልተላከሎትም?
        </Button>
      </div>
    </section>
  );
}
