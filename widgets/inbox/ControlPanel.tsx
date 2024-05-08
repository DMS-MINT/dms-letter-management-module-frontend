"use client";
import { Button } from "@/components/ui/button";
import { UserTypeEnum } from "@/typing/enum";
import { Plus, RotateCw } from "lucide-react";
import Link from "next/link";

export default function ControlPanel() {
  function refreshPage() {
    window.location.reload();
  }

  const userType: UserTypeEnum = UserTypeEnum.STANDARD_USER;

  return (
    <section className="flex items-center justify-between w-full">
      <h1 className="page-title">ገቢ ደብዳቤዎች</h1>
      <div className="flex items-center gap-4">
        {/* {userType.valueOf() === UserTypeEnum.CLERK.valueOf() ? (
          
        ) : null} */}
        <Button variant="outline" size="icon" onClick={refreshPage}>
          <RotateCw className="w-5 h-5" />
        </Button>
        <Link href="/compose">
          <Button className="flex gap-1 w-fit items-center">
            <Plus size={19} />
            አዲስ ደብዳቤ
          </Button>
        </Link>
      </div>
    </section>
  );
}
