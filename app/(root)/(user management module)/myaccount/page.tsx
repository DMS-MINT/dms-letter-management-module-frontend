"use client";

import OutgoingLetterPrintPreview from "@/components/features/letter/print/OutgoingLetter/OutgoingLetterPrintPreview";
import { useRef } from "react";

export default function MyAccount() {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <OutgoingLetterPrintPreview forwardedRef={componentRef} />
    </div>
  );
}
