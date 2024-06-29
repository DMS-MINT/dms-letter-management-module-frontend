"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Printer, Dot } from "lucide-react";
import {
  createLetter,
  selectAttachments,
  selectLetterDetails,
  selectStatus,
} from "@/lib/features/letter/letterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { letterSerializer } from "@/utils";
import { useEffect, useState } from "react";
import { RequestStatusEnum } from "@/typing/enum";
import { redirect } from "next/navigation";
import { toggleDrawerVisibility } from "@/lib/features/ui/uiManagerSlice";
import SubmitLetterForm from "../forms/SubmitLetterForm";
interface IContentJson {
  content: string;
}

export default function ComposeControlPanel() {
  const letterDetail = useAppSelector(selectLetterDetails);
  const status = useAppSelector(selectStatus);
  const attachments = useAppSelector(selectAttachments);
  const dispatch = useAppDispatch();
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);

  useEffect(() => {
    dispatch(toggleDrawerVisibility(false));
  }, []);

  useEffect(() => {
    setContentJson([
      { content: letterDetail?.content ? letterDetail?.content : "" },
    ]);
  }, [letterDetail]);

  const dispatchCreateLetter = () => {
    const composeFormData = letterSerializer(
      letterDetail,
      attachments,
      letterDetail.signature
    );
    dispatch(createLetter(composeFormData));
  };

  useEffect(() => {
    if (
      status === RequestStatusEnum.FULFILLED &&
      letterDetail.reference_number
    ) {
      const category =
        letterDetail.current_state === "Draft" ? "draft" : "outbox";
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

        <SubmitLetterForm compose={true} />
      </div>
    </section>
  );
}
