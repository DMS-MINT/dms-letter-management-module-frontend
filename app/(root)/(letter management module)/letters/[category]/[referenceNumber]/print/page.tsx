"use client";

import {
  InternalLetterPrintPreview,
  OutgoingLetterPrintPreview,
} from "@/components/features/letter";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";

export default function PrintPreview() {
  const letterDetails = useAppSelector(selectLetterDetails);

  return letterDetails.letter_type === "internal" ? (
    <InternalLetterPrintPreview />
  ) : letterDetails.letter_type === "outgoing" ? (
    <OutgoingLetterPrintPreview />
  ) : (
    ""
  );
}
