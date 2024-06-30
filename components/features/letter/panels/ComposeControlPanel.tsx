"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot, Printer } from "lucide-react";
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
import HeaderTemplate from "./HeaderTemplate";
import FooterTemplate from "./FooterTemplate";
import { renderToString } from "react-dom/server";
import HeaderOutgoingTemplate from "./HeaderOutgoingTemplate";
import FooterOutgoingTemplate from "./FooterOutgoingTemplate";

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

  const handlePrint = async () => {
    if (typeof window !== "undefined") {
      const printJS = (await import("print-js")).default;
      let header;
      let footer;
      if (letterDetails?.letter_type === "internal") {
        header = renderToString(
          <HeaderTemplate letterDetails={letterDetails} />
        );
        footer = renderToString(
          <FooterTemplate letterDetails={letterDetails} />
        );
      } else {
        header = renderToString(
          <HeaderOutgoingTemplate letterDetails={letterDetails} />
        );
        footer = renderToString(
          <FooterOutgoingTemplate letterDetails={letterDetails} />
        );
      }

      const content = contentJson.map((item) => item.content).join("");

      const printableContent = `
        <html>
          <head>
            <style>
              @page {
                size: auto;
                margin: 20mm 5mm; 
              }
              body {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              .header, .footer {
                width: 100%;
                
              }
              .content {
                margin-left: 15mm;
                margin-right: 15mm;
                padding: 0.5rem;
                padding-top: 1rem;
                padding-bottom: 0;
              }
              p {
                margin: 0.5rem;
              }
            </style>
          </head>
          <body>
            <div class="header">${header}</div>
            <div class="content">${content}</div>
            <div class="footer">${footer}</div>
          </body>
        </html>
      `;
      printJS({
        printable: printableContent,
        type: "raw-html",
        scanStyles: false,
        documentTitle: `${letterDetails.subject}`,
      });
    }
  };
  // page-break-inside: avoid;
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
        {letterDetails?.letter_type === "incoming" ? (
          <SubmitLetterForm action="create_and_publish" />
        ) : (
          <SubmitLetterForm action="create_and_submit" />
        )}
      </div>
    </section>
  );
}
