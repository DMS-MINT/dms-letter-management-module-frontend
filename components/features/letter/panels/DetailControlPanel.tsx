"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dot, Printer } from "lucide-react";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { updateLetterSerializer } from "@/utils";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const dispatch = useAppDispatch();

  const dispatchLetterUpdate = () => {
    const serializedLetter = updateLetterSerializer(letterDetails);

    dispatch(
      updateLetter({
        id: letterDetails.id,
        letter: serializedLetter,
      })
    );
  };

  return (
    <section className="flex items-center justify-between w-full">
      {letterDetails.subject ? (
        <h1 className="page-title">{letterDetails.subject}</h1>
      ) : (
        <Skeleton className="h-8 w-96" />
      )}

      {letterDetails.status ? (
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 ml-2"
        >
          <Dot /> {letterStatusLookup[letterDetails.status]}
        </Badge>
      ) : (
        <Skeleton className="h-8 w-14 ml-2" />
      )}

      <div className="flex items-center ml-auto gap-2">
        <Button variant="outline" size="icon">
          <ChevronLeft size={20} />
        </Button>
        <Button variant="outline" size="icon">
          <ChevronRight size={20} />
        </Button>
        <Button variant="outline" size="icon">
          <Printer size={20} />
        </Button>
        <Button variant={"outline"} onClick={dispatchLetterUpdate}>
          አርም
        </Button>
        <Button onClick={dispatchLetterUpdate}>ደብዳቤውን ላክ</Button>
      </div>
    </section>
  );
}
