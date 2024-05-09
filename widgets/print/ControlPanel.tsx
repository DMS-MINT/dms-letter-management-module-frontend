"use client";
import { Button } from "@/components/ui/button";
import { UserTypeEnum } from "@/typing/enum";
import { FileText, NotepadText, Plus, Printer, RotateCw } from "lucide-react";
import Link from "next/link";
import { text } from "stream/consumers";

export default function ControlPanel() {
  function refreshPage() {
    window.location.reload();
  }

  const userType: UserTypeEnum = UserTypeEnum.STANDARD_USER;

  return (
    <section className="flex items-center justify-between w-full">
      <h1 className="page-title">
        የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ
      </h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex gap-1 w-fit items-center v">
          <FileText />
          PDF
        </Button>
        <Button variant="outline" size="icon" onClick={refreshPage}>
          <RotateCw className="w-5 h-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={refreshPage}>
          <NotepadText className="w-5 h-5" />
        </Button>
        <Link href="/compose">
          <Button className="flex gap-1 w-fit items-center">
            <Printer />
            አትም
          </Button>
        </Link>
      </div>
    </section>
  );
}
