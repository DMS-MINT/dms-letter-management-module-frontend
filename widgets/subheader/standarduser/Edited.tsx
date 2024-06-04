import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dot, Printer } from "lucide-react";
import React from "react";
import StatusEnum from "@/typing/enum/StatusEnum";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { updateLetterSerializer } from "@/utils";

export default function edited() {
  const letter = useAppSelector(selectLetterDetails);
  const dispatch = useAppDispatch();

  const dispatchLetterUpdate = () => {
    const serializedLetter = updateLetterSerializer(letter);

    dispatch(
      updateLetter({
        id: "68c0dfb0-26e8-41df-990d-0d554636a732",
        letter: serializedLetter,
      })
    );
  };

  return (
    <div className="flex items-center flex-1 ml-2 gap-2">
      <Badge
        variant="destructive"
        className="rounded-md flex items-center justify-between pl-0 mr-auto"
      >
        <Dot /> {StatusEnum.EDITED}
      </Badge>
      <Button variant="outline" size="icon">
        <ChevronLeft size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <ChevronRight size={20} />
      </Button>
      <Button variant="outline" size="icon">
        <Printer size={20} />
      </Button>
      <Button onClick={dispatchLetterUpdate}>አርም</Button>
    </div>
  );
}
