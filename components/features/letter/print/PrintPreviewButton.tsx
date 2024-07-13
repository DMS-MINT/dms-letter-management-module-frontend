"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import InternalLetterPrintPreview from "./InternalLetterPrintPreview";
import OutgoingLetterPrintPreview from "./OutgoingLetter/OutgoingLetterPrintPreview";

export default function PrintPreviewButton() {
  const componentRef = useRef<HTMLDivElement>(null);
  const letterDetails = useAppSelector(selectLetterDetails);

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <Button variant="outline" size="icon">
            <Printer size={20} />
          </Button>
        )}
        content={() => componentRef.current!}
        documentTitle={
          letterDetails?.subject || letterDetails?.reference_number
            ? `${letterDetails?.subject}-${letterDetails?.reference_number}-dms`
            : "Untitled Document DMS"
        }
      />

      <div style={{ display: "none" }}>
        {letterDetails?.letter_type === "internal" ? (
          <InternalLetterPrintPreview forwardedRef={componentRef} />
        ) : letterDetails?.letter_type === "outgoing" ? (
          <OutgoingLetterPrintPreview forwardedRef={componentRef} />
        ) : null}
      </div>
    </div>
  );
}
