"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { removeToTrash } from "@/lib/features/letter/letterSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface LetterDetails {
  reference_number: string;
}

interface PermanentlyDeleteDialogProps {
  letterDetails: LetterDetails;
}

const PermanentlyDeleteDialog: React.FC<PermanentlyDeleteDialogProps> = ({
  letterDetails,
}) => {
  const dispatch = useDispatch();

  const handleRemoveClick = () => {
    dispatch(removeToTrash(letterDetails.reference_number) as any);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>በቋሚነት ያስወግዱ</Button>
      </DialogTrigger>
      <DialogContent className="min-w-[45rem] max-w-[45rem] max-h-[40rem] flex flex-col bg-white p-4 rounded-md shadow-lg">
        <DialogHeader className="flex-1 p-2">
          <DialogTitle className="text-lg font-medium">
            ደብዳቤውን በቋሚነት አጥፋ
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 p-2">
          <div className="flex justify-end mt-4 space-x-2">
            <Button variant={"outline"} onClick={handleRemoveClick}>
              አዎ
            </Button>
            <DialogClose asChild>
              <Button variant={"outline"}>አይ</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PermanentlyDeleteDialog;
