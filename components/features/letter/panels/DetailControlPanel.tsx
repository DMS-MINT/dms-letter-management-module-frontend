/** @format */

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Dot,
  FileText,
  Printer,
  Trash,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteLetter,
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { updateLetterSerializer } from "@/utils";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";
import { jsPDF } from "jspdf";

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  function downloadAsPDFWithJsPDF() {
    const doc = new jsPDF();
    const letterContent = letterDetails.content;
    doc.text(letterContent, 10, 10);

    doc.save("letter.pdf");
  }

  const dispatch = useAppDispatch();

  const dispatchLetterUpdate = () => {
    const serializedLetter = updateLetterSerializer(letterDetails);

    dispatch(
      updateLetter({
        id: letterDetails.id,
        letter: serializedLetter,
      })
    );
  };

  const handlePrint = () => {
    document.body.style.margin = "0";
    window.print();
  };

  const dispatchLetterDelete = () => {
    dispatch(deleteLetter(letterDetails.id));
  };

  if (
    !letterDetails ||
    !letterDetails.hasOwnProperty("subject") ||
    !letterDetails.hasOwnProperty("status")
  ) {
    // redirect("/letters/draft");
  }

  return (
    <section className='flex items-center justify-between w-full overflow-auto '>
      {letterDetails.subject ? (
        <h1 className='page-title'>{letterDetails.subject}</h1>
      ) : (
        <Skeleton className='h-8 w-96' />
      )}

      {letterDetails.status ? (
        <Badge
          variant='destructive'
          className='rounded-md flex items-center justify-between pl-0 ml-2'
        >
          <Dot /> {letterStatusLookup[letterDetails.status]}
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
          <FileText />
          PDF
        </Button>
        {/* <Button variant='outline' size='icon'>
          <ChevronLeft size={20} />
        </Button>
        <Button variant='outline' size='icon'>
          <ChevronRight size={20} />
        </Button> */}
        <Button variant='outline' size='icon' onClick={handlePrint}>
          <Printer size={20} />
        </Button>
        <Button variant='outline' size='icon' onClick={dispatchLetterDelete}>
          <Trash size={20} />
        </Button>
        <Button variant={"outline"} onClick={dispatchLetterUpdate}>
          አርም
        </Button>
        <Button onClick={dispatchLetterUpdate}>ደብዳቤውን ላክ</Button>
      </div>
    </section>
  );
}
