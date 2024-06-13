/** @format */

"use client";

import { Button } from "@/components/ui/button";
import { FileText, NotepadText, Printer, RotateCw } from "lucide-react";
import Link from "next/link";

export default function PrintControlPanel() {
  function refreshPage() {
    window.location.reload();
  }

  return (
    <section className='flex items-center justify-between w-full overflow-auto'>
      <h1 className='page-title'>
        የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ
      </h1>
      <div className='flex items-center gap-4'>
        <Button variant='outline' className='flex gap-1 w-fit items-center v'>
          <FileText />
          PDF
        </Button>
        <Button variant='outline' size='icon' onClick={refreshPage}>
          <RotateCw className='w-5 h-5' />
        </Button>
        <Button variant='outline' size='icon' onClick={refreshPage}>
          <NotepadText className='w-5 h-5' />
        </Button>
        <Link href='/compose'>
          <Button className='flex gap-1 w-fit items-center'>
            <Printer />
            አትም
          </Button>
        </Link>
      </div>
    </section>
  );
}
