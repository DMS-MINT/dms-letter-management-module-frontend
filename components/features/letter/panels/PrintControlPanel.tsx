"use client";

import { Button } from "@/components/ui/button";
import { FileText, Printer } from "lucide-react";
import Link from "next/link";

export default function PrintControlPanel() {
  return (
    <section className="flex items-center justify-between w-full overflow-auto">
      <h1 className="page-title">
        የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ
      </h1>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex gap-1 w-fit items-center v">
          <FileText />
          PDF
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
