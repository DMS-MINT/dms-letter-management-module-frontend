/** @format */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot, Printer, Download, Trash } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import ActionButtons from "../miscellaneous/ActionButtons";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { jsPDF } from "jspdf";

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const permissions = useAppSelector(selectPermissions);
  const handlePrint = () => {
    document.body.style.margin = "0";
    window.print();
  };
  function downloadAsPDFWithJsPDF() {
    const doc = new jsPDF();
    const letterContent = letterDetails.content;
    doc.text(letterContent, 10, 10);

    doc.save("letter.pdf");
  }

  return (
    <section className='flex items-center justify-between w-full no-print'>
      {Object.keys(permissions).length !== 0 ? (
        letterDetails.subject ? (
          <h1 className='page-title'>{letterDetails.subject}</h1>
        ) : (
          <h1 className='page-title !text-gray-400'>ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>
        )
      ) : (
        <Skeleton className='h-8 w-96' />
      )}

      {letterDetails.current_state && letterDetails.current_state.name ? (
        <Badge
          variant='destructive'
          className='rounded-md flex items-center justify-between pl-0 ml-2'
        >
          <Dot /> {letterStatusLookup[letterDetails.current_state.name]}
        </Badge>
      ) : (
        <Skeleton className='h-8 w-14 ml-2' />
      )}

      <div className='flex items-center ml-auto gap-2'>
        <Button
          variant='outline'
          className='flex gap-1 w-fit items-center v'
          onClick={downloadAsPDFWithJsPDF}
        >
          <Download />
          PDF
        </Button>
        <Button variant='outline' size='icon' onClick={handlePrint}>
          <Printer size={20} />
        </Button>
        <ActionButtons />
      </div>
    </section>
  );
}
