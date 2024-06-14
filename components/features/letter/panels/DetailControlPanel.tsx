"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dot, Printer, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteLetter,
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { updateLetterSerializer } from "@/utils";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import { redirect } from "next/navigation";

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const dispatch = useAppDispatch();
  const [isStateDefined, setIsStateDefined] = useState(false);

  useEffect(() => {
    if (letterDetails.state && letterDetails.state.name) {
      setIsStateDefined(true);
    } else {
      setIsStateDefined(false);
    }
  }, [letterDetails.state]);

  const dispatchLetterUpdate = () => {
    const serializedLetter = updateLetterSerializer(letterDetails);

    dispatch(
      updateLetter({
        id: letterDetails.id,
        letter: serializedLetter,
      })
    );
  };

  const dispatchLetterDelete = () => {
    dispatch(deleteLetter(letterDetails.id));
  };

  if (!isStateDefined) {
    return null;
  }

  return (
    <section className="flex items-center justify-between w-full">
      {letterDetails.subject ? (
        <h1 className="page-title">{letterDetails.subject}</h1>
      ) : (
        <Skeleton className="h-8 w-96" />
      )}

      {letterDetails.state && letterDetails.state.name ? (
        <Badge
          variant="destructive"
          className="rounded-md flex items-center justify-between pl-0 ml-2"
        >
          <Dot /> {letterStatusLookup[letterDetails.state.name]}
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
        <Button variant="outline" size="icon" onClick={dispatchLetterDelete}>
          <Trash size={20} />
        </Button>
        <Button variant={"outline"} onClick={dispatchLetterUpdate}>
          አርም
        </Button>
        <Button onClick={dispatchLetterUpdate}>ደብዳቤውን ላክ</Button>
      </div>
    </section>
  );
}
