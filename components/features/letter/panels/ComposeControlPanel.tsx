"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { toggleDrawerVisibility } from "@/lib/features/ui/uiManagerSlice";
import SubmitLetterForm from "../forms/SubmitLetterForm";
import PrintPreviewButton from "../print/PrintPreviewButton";

interface IContentJson {
  content: string;
}

export default function ComposeControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const status = useAppSelector(selectStatus);
  const attachments = useAppSelector(selectAttachments);
  const dispatch = useAppDispatch();
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);
  const router = useRouter();

  useEffect(() => {
    dispatch(toggleDrawerVisibility(false));
  }, []);

  useEffect(() => {
    setContentJson([
      { content: letterDetails?.content ? letterDetails?.content : "" },
    ]);
  }, [letterDetails]);

  const dispatchCreateLetter = () => {
    if (letterDetails) {
      const composeFormData = letterSerializer(
        letterDetails,
        attachments,
        letterDetails.signature
      );
      dispatch(createLetter(composeFormData));
    }
  };

  useEffect(() => {
    if (
      status === RequestStatusEnum.FULFILLED &&
      letterDetails?.reference_number
    ) {
      const category =
        letterDetails?.current_state === "Draft" ? "draft" : "outbox";
      router.push(`/letters/${category}/${letterDetails?.reference_number}`);
    }
  }, [status, letterDetails]);

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
        <PrintPreviewButton />
        <Button
          className="mr-0 RECIPIENTborder-gray-300 rounded-md"
          variant="outline"
          onClick={dispatchCreateLetter}
        >
          ረቂቁን ያስቀምጡ
        </Button>
        {letterDetails?.letter_type === "incoming" ? (
          <SubmitLetterForm action="create_and_publish" />
        ) : (
          <SubmitLetterForm action="create_and_submit" />
        )}
      </div>
    </section>
  );
}
