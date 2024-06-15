"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { letterTypeLookup } from "@/typing/dictionary";
import { Mail, MessageSquare } from "lucide-react";
import { useEffect } from "react";

export default function LetterDetailsDrawer() {
  const letterDetails = useAppSelector(selectLetterDetails);

  useEffect(() => {
    console.log(letterDetails);
  }, [letterDetails]);

  return (
    <section className="flex flex-col gap-10 no-print">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Mail size={20} className="text-gray-600" />
          <p className="text-gray-600">የደብዳቤ አይነት</p>
        </div>
        {!letterDetails.state ? (
          <Skeleton className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal" />
        ) : (
          <Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal">
            {letterTypeLookup[letterDetails.letter_type.toUpperCase()]}
          </Badge>
        )}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-gray-600" />
          <p className="text-gray-600">1</p>
        </div>
      </div>
    </section>
  );
}
