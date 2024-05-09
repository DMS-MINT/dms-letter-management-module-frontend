import React from "react";
import { OutgoingLetterPreview, InternalLetterPreview } from "@/widgets/print";
export default function page() {
  return false ? <InternalLetterPreview /> : <OutgoingLetterPreview />;
}
