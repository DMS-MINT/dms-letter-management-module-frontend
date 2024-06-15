"use client";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { useAppSelector } from "@/lib/hooks";
import { letterTypeLookup } from "@/typing/dictionary";
import { Mail, MessageSquare, FileDigit } from "lucide-react";
import { Fragment } from "react";

interface ILetterMetaData {
  label: string;
  value: string;
  icon: JSX.Element;
}

export default function LetterDetailsDrawer() {
  const letterDetails = useAppSelector(selectLetterDetails);

  const LetterMetaData: ILetterMetaData[] = [
    {
      label: "የደብዳቤ አይነት",
      value: letterTypeLookup[letterDetails.letter_type.toUpperCase()],
      icon: <Mail size={20} className="text-gray-600" />,
    },
    {
      label: "የማጣቀሻ ቁጥር",
      value: letterDetails.reference_number,
      icon: <FileDigit size={20} className="text-gray-600" />,
    },
  ];

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        {LetterMetaData.map(({ label, value, icon }) => (
          <Fragment key={label}>
            <div className="flex items-center gap-2">
              {icon}
              <p className="text-gray-600">{label}</p>
            </div>
            {!letterDetails.current_state ? (
              <Skeleton className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2" />
            ) : (
              <Badge className="rounded-sm text-gray-900 bg-gray-200 h-10 text-base font-normal mb-2">
                {value}
              </Badge>
            )}
          </Fragment>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <MessageSquare size={20} className="text-gray-600" />
          <p className="text-gray-600">
            {letterDetails.comments ? letterDetails.comments.length : 0}
          </p>
        </div>
      </div>
    </section>
  );
}
