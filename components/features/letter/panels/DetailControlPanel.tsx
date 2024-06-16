"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot, Printer } from "lucide-react";
import { useAppSelector } from "@/lib/hooks";
import { selectLetterDetails } from "@/lib/features/letter/letterSlice";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import ActionButtons from "../miscellaneous/ActionButtons";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const permissions = useAppSelector(selectPermissions);

  if (Object.keys(permissions).length === 0) {
    return null;
  }

  return (
    <section className="flex items-center justify-between w-full">
      {Object.keys(permissions).length !== 0 ? (
        letterDetails.subject ? (
          <h1 className="page-title">{letterDetails.subject}</h1>
        ) : (
          <h1 className="page-title !text-gray-400">ርዕሰ ጉዳይ የሌለው ደብዳቤ</h1>
        )
      ) : (
        <Skeleton className="h-8 w-96" />
      )}

      {letterDetails.current_state && letterDetails.current_state.name ? (
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 ml-2"
        >
          <Dot /> {letterStatusLookup[letterDetails.current_state.name]}
        </Badge>
      ) : (
        <Skeleton className="h-8 w-14 ml-2" />
      )}

      <div className="flex items-center ml-auto gap-2">
        <Button variant="outline" size="icon">
          <Printer size={20} />
        </Button>
        <ActionButtons />
      </div>
    </section>
  );
}
