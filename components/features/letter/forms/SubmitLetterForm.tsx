"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { SignaturePad } from "@/components/shared";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createAndSubmitLetter,
  createAndPublishLetter,
  selectAttachments,
  selectLetterDetails,
  selectStatus,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { useEffect, useState } from "react";
import { VerifyUserForm } from "@/components/features/user";
import { letterSerializer } from "@/utils";
import {
  publishLetter,
  submitLetter,
} from "@/lib/features/letter/workflow/workflowSlice";
import {
  resetDefaultSignature,
  selectDefaultSignature,
} from "@/lib/features/authentication/authSlice";

type ActionType =
  | "create_and_submit"
  | "update_and_submit"
  | "create_and_publish"
  | "update_and_publish";

export default function SubmitLetterForm({ action }: { action: ActionType }) {
  const letterDetails = useAppSelector(selectLetterDetails);
  const attachments = useAppSelector(selectAttachments);
  const default_signature = useAppSelector(selectDefaultSignature);
  const status = useAppSelector(selectStatus);
  const [signature, setSignature] = useState<File | undefined>();
  const dispatch = useAppDispatch();

  const handleSignatureChange = (file: File | undefined) => {
    setSignature(file);
  };

  useEffect(() => {
    handleSignatureChange(undefined);
  }, [status]);

  const handleSubmit = () => {
    if (signature && letterDetails) {
      const serializedLetter = letterSerializer(
        letterDetails,
        attachments,
        signature
      );

      switch (action) {
        case "create_and_submit":
          dispatch(createAndSubmitLetter(serializedLetter));
          break;
        case "update_and_submit":
          dispatch(
            updateLetter({
              reference_number: letterDetails?.reference_number,
              letter: serializedLetter,
            })
          );
          dispatch(submitLetter(letterDetails?.reference_number));
          break;
        case "create_and_publish":
          dispatch(createAndPublishLetter(serializedLetter));
          break;
        case "update_and_publish":
          dispatch(
            updateLetter({
              reference_number: letterDetails?.reference_number,
              letter: serializedLetter,
            })
          );
          dispatch(publishLetter(letterDetails?.reference_number));
          break;
        default:
          break;
      }

      dispatch(resetDefaultSignature());
      handleSignatureChange(undefined);
    }
    handleSignatureChange(undefined);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {action === "create_and_publish" || action === "update_and_publish" ? (
          <Button>ደብዳቤውን አከፋፍል</Button>
        ) : (
          <Button>ወደ መዝገብ ቢሮ አስተላልፍ</Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[45rem] max-w-[45rem] ">
        <DialogHeader className="gap-2">
          <DialogTitle>
            {action === "create_and_publish" || action === "update_and_publish"
              ? "ደብዳቤውን አከፋፍል"
              : "ወደ መዝገብ ቢሮ አስተላልፍ"}
          </DialogTitle>
          <DialogDescription>
            {action === "create_and_publish" || action === "update_and_publish"
              ? "እርግጠኛ ነዎት ደብዳቤውን ማተም ይፈልጋሉ?"
              : "እርግጠኛ ነዎት ደብዳቤውን ወደ ወደ መዝገብ ቢሮ በቋሚነት ማስገባት ይፈልጋሉ?"}
          </DialogDescription>
          {default_signature ? (
            <div className="flex items-center">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${default_signature}`}
                className="bg-white w-80"
              />
            </div>
          ) : (
            <SignaturePad handleSignatureChange={handleSignatureChange} />
          )}
        </DialogHeader>
        <DialogFooter>
          <VerifyUserForm />
          <DialogClose asChild>
            <Button className="bg-white text-black hover:bg-white">አይ</Button>
          </DialogClose>
          <Button
            disabled={signature || default_signature ? false : true}
            type="submit"
            onClick={handleSubmit}
          >
            አዎ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
