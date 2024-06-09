"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Dot } from "lucide-react";
import Link from "next/link";
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
  setLetterStatus,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createLetterSerializer } from "@/utils";
import { useEffect } from "react";
import { RequestStatusEnum } from "@/typing/enum";
import { redirect } from "next/navigation";

export default function ComposeControlPanel() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const dispatchSetLetterStatus = (status: string) => {
    dispatch(setLetterStatus(status));
  };

  useEffect(() => {
    if (letterDetail.status) {
      const serializedLetter = createLetterSerializer(letterDetail);
      dispatch(createLetter(serializedLetter));
    }
  }, [letterDetail.status]);

  useEffect(() => {
    if (status === RequestStatusEnum.FULFILLED) {
      const category = letterDetail.status === "Draft" ? "draft" : "outbox";

      redirect(`/letters/${category}/${letterDetail.id}`);
    }
  }, [status]);

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
        <Link href="/letters/print">
          <Button variant="outline" size="icon">
            <Printer size={20} />
          </Button>
        </Link>
        <Button
          className="mr-0 RECIPIENTborder-gray-300 rounded-md"
          variant="outline"
          onClick={() => {
            dispatchSetLetterStatus("Draft");
          }}
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
              <Button
                type="submit"
                onClick={() => dispatchSetLetterStatus("Pending Approval")}
              >
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
