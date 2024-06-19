"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Dot, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  createLetter,
  selectLetterDetails,
  selectStatus,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createLetterSerializer } from "@/utils";
import { useEffect, useState } from "react";
import { RequestStatusEnum } from "@/typing/enum";
import { redirect } from "next/navigation";
import printJS from "print-js";

interface IContentJson {
  content: string;
}

export default function ComposeControlPanel() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const status = useAppSelector(selectStatus);
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setContentJson([{ content: letterDetail.content }]);
  }, [letterDetail]);

  const dispatchCreateLetter = () => {
    const serializedLetter = createLetterSerializer(letterDetail);
    dispatch(createLetter(serializedLetter));
  };

  useEffect(() => {
    if (status === RequestStatusEnum.FULFILLED) {
      const category =
        letterDetail.current_state.name === "Draft" ? "draft" : "outbox";
      redirect(`/letters/${category}/${letterDetail.reference_number}`);
    }
  }, [status]);

  return (
    <section className="flex items-center justify-between w-full overflow-auto">
      <div className="flex gap-2 no-print">
        <h1 className="page-title">አዲስ ደብዳቤ </h1>
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 "
        >
          <Dot /> አልተቀመጠም
        </Badge>
      </div>
      <div className="flex items-center gap-3 no-print">
        <Button
          variant="outline"
          className="flex gap-1 w-fit items-center v"
          onClick={() =>
            printJS({
              printable: contentJson,
              properties: ["content"],
              type: "json",
            })
          }
        >
          <Download />
          PDF
        </Button>
        {/* <Link href="/letters/${category}/${letterDetail.id}/print">
          <Button variant="outline" size="icon">
            <Printer size={20} />
          </Button>
        </Link> */}
        <Button
          className="mr-0 RECIPIENTborder-gray-300 rounded-md"
          variant="outline"
          onClick={dispatchCreateLetter}
        >
          ረቂቁን ያስቀምጡ
        </Button>

        <Button className="ml-0 border-gray-300 rounded-md" variant="outline">
          ደብዳቤውን ምራ
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">ላክ</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ያረጋግጡ</DialogTitle>
              <DialogDescription>
                እርግጠኛ ነዎት ደብዳቤውን ወደ ማህደር ቢሮ በቋሚነት ማስገባት ይፈልጋሉ
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit" onClick={dispatchCreateLetter}>
                አዎ
              </Button>
              <Button className="bg-white text-black hover:bg-white">አይ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
