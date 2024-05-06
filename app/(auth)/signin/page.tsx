import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function SignIn() {
  return (
    <section className="flex flex-col gap-7">
      <div>
        <h2 className="text-gray-900 font-medium text-xl mt-5 mb-2">
          እንኳን ደህና መጡ!
        </h2>
        <p className="text-gray-700 font-light text-sm">
          እባክዎ ለመግባት የተጠቃሚ መለያዎን እና የይለፍ ቃልዎን ያስገቡ።
        </p>
      </div>
      <form className="flex flex-col gap-5 ">
        <div className="grid items-center gap-1.5">
          <Label htmlFor="የላኪ ፖስታ ቁጥር">የተጠቃሚ መለያዎን ያስገቡ</Label>
          <Input type="text" id="የላኪ ፖስታ ቁጥር" />
        </div>
        <div className="grid items-center gap-1.5">
          <div className="flex justify-between items-center h-fit">
            <Label htmlFor="የላኪ ፖስታ ቁጥር">የይለፍ ቃልዎን ያስገቡ</Label>
            <Link href="/forgot-password">
              <Button variant="link" className="py-0 h-fit">
                የይለፍ ቃልዎን ረስተዋል?
              </Button>
            </Link>
          </div>
          <Input type="text" id="የላኪ ፖስታ ቁጥር" />
        </div>
        <Link href="/letters/inbox">
          <Button
            variant="secondary"
            className="flex gap-2 items-center w-full"
          >
            <LogIn size={20} />
            ግባ
          </Button>
        </Link>
      </form>
      <div className="flex gap-2 items-center self-center">
        <p className="text-gray-800">የቴክኒክ ድጋፍ ለማግኘት </p>
        <Button variant="link" className="p-0 h-fit text-base">
          እኛን ያነጋግሩን
        </Button>
      </div>
    </section>
  );
}
