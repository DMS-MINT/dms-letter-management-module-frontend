"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Dot } from "lucide-react";
import dynamic from "next/dynamic";
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
interface IContentJson {
  content: string;
}

export default function ComposeControlPanel() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);

  useEffect(() => {
    setContentJson([
      { content: letterDetail.content ? letterDetail.content : "" },
    ]);
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

  const handlePrint = async () => {
    if (typeof window !== "undefined") {
      const printJS = (await import("print-js")).default;
      printJS({
        printable: contentJson,
        properties: ["content"],
        type: "json",
      });
    }
  };

  return (
    <section className="flex items-center justify-between w-full">
      <div className="flex gap-2">
        <h1 className="page-title">አዲስ ደብዳቤ </h1>
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 "
        >
          <Dot /> አልተቀመጠም
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" onClick={handlePrint}>
          <Printer size={20} />
        </Button>
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
