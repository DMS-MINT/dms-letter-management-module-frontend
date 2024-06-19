"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dot, Download, Printer, Trash } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteLetter,
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { updateLetterSerializer } from "@/utils";
import { letterStatusLookup } from "@/typing/dictionary";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import printJS from "print-js";

interface IContentJson {
  content: string;
}

export default function DetailControlPanel() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const [contentJson, setContentJson] = useState<IContentJson[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setContentJson([{ content: letterDetails.content }]);
  }, [letterDetails]);

  const dispatchLetterUpdate = () => {
    const serializedLetter = updateLetterSerializer(letterDetails);

    dispatch(
      updateLetter({
        letter: serializedLetter,
        reference_number: "",
      })
    );
  };

  const dispatchLetterDelete = () => {
    dispatch(deleteLetter(letterDetails.id));
  };

  return (
    <section className="flex items-center justify-between w-full overflow-auto ">
      {letterDetails.subject ? (
        <h1 className="page-title">{letterDetails.subject}</h1>
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
        <Button
          variant="outline"
          className="flex gap-1 w-fit items-center v"
          onClick={() =>
            printJS({
              printable: contentJson,
              properties: ["content"],
              type: "json",
            })
          }
        >
          <Download />
          PDF
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
