"use client";

import { Button } from "@/components/ui/button";
import {
  moveToTrash,
  resetAttachments,
  removeFromTrash,
  selectAttachments,
  selectLetterDetails,
  updateLetter,
  restoreFromTrash,
} from "@/lib/features/letter/letterSlice";
import {
  closeLetter,
  publishLetter,
  rejectLetter,
  reopenLetter,
  retractLetter,
  selectCurrentUserPermissions,
} from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { letterSerializer } from "@/utils";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ShareLetterForm,
  SubmitLetterForm,
} from "@/components/features/letter";
import { useRouter } from "next/navigation";
import PermanentlyDeleteDialog from "../deleteDialog/PermanentlyDeleteDialog";

interface IButtonConfig {
  isVisible: boolean;
  isButton: boolean;
  component?: JSX.Element;
  label?: string | null;
  icon?: JSX.Element;
  variant:
    | "link"
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "third"
    | "ghost";
  size: "default" | "sm" | "lg" | "icon";
  style: string;
  action: () => void;
}

export default function ActionButtons() {
  const letterDetails = useAppSelector(selectLetterDetails);
  const attachments = useAppSelector(selectAttachments);
  const current_user_permissions = useAppSelector(selectCurrentUserPermissions);
  const [buttonConfigs, setButtonConfigs] = useState<IButtonConfig[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (Object.keys(current_user_permissions).length > 0) {
      const configs: IButtonConfig[] = [
        {
          // @ts-ignore
          isVisible: current_user_permissions.can_trash_letter,
          isButton: true,
          variant: "outline",
          style: "",
          size: "icon",
          icon: <Trash size={20} />,
          action: () => {
            dispatch(moveToTrash(letterDetails.reference_number));
          },
        },
        {
          isVisible: current_user_permissions.can_share_letter,
          isButton: false,
          component: <ShareLetterForm />,
          label: "ደብዳቤውን አጋራ",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {},
        },
        {
          isVisible: current_user_permissions.can_restore_letter,
          isButton: true,
          label: "ወደነበረበት መልስ",
          variant: "default",
          style: "",
          size: "default",
          action: () => {
            dispatch(restoreFromTrash(letterDetails.reference_number));
          },
        },
        {
          isVisible: current_user_permissions.can_remove_from_trash_letter,
          isButton: false,
          component: <PermanentlyDeleteDialog />,
          label: "remove",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {},
        },
        {
          isVisible: current_user_permissions.can_update_letter,
          isButton: true,
          label: "ለውጦቹን አስቀምጥ",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {
            const serializedLetter = letterSerializer(
              letterDetails,
              attachments,
              letterDetails.signature
            );

            dispatch(
              updateLetter({
                reference_number: letterDetails.reference_number,
                letter: serializedLetter,
              })
            );

            dispatch(resetAttachments());
          },
        },
        {
          isVisible: current_user_permissions.can_submit_letter,
          isButton: false,
          component: <SubmitLetterForm action="update_and_submit" />,
          label: "ወደ መዝገብ ቢሮ አስተላልፍ",
          variant: "default",
          style: "",
          size: "default",
          action: () => {},
        },
        {
          isVisible:
            letterDetails?.letter_type === "incoming" &&
            current_user_permissions.can_publish_letter,
          isButton: false,
          component: <SubmitLetterForm action="update_and_publish" />,
          label: "ወደ መዝገብ ቢሮ አስተላልፍ",
          variant: "default",
          style: "",
          size: "default",
          action: () => {},
        },
        {
          isVisible: current_user_permissions.can_retract_letter,
          isButton: true,
          label: "ለክለሳ መልስ",
          variant: "destructive",
          style: "",
          size: "default",
          action: () => {
            dispatch(retractLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible:
            letterDetails?.letter_type !== "incoming" &&
            current_user_permissions.can_reject_letter,
          isButton: true,
          label: "ደብዳቤውን አትቀበል",
          variant: "destructive",
          style: "",
          size: "default",
          action: () => {
            dispatch(rejectLetter(letterDetails.reference_number));
            router.push("/letters/pending/");
          },
        },
        {
          isVisible:
            letterDetails?.letter_type !== "incoming" &&
            current_user_permissions.can_publish_letter,
          isButton: true,
          label: "ደብዳቤውን አከፋፍል",
          variant: "third",
          style: "",
          size: "default",
          action: () => {
            dispatch(publishLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible: current_user_permissions.can_close_letter,
          isButton: true,
          label: "የደብዳቤውን የስራ ሂደት አጠናቅ",
          variant: "third",
          style: "",
          size: "default",
          action: () => {
            dispatch(closeLetter(letterDetails.reference_number));
          },
        },
        {
          isVisible: current_user_permissions.can_reopen_letter,
          isButton: true,
          label: "የደብዳቤውን የስራ ሂደት እንደገና ክፈት",
          variant: "default",
          style: "",
          size: "default",
          action: () => {
            dispatch(reopenLetter(letterDetails.reference_number));
          },
        },
      ];
      setButtonConfigs(configs);
    }
  }, [letterDetails, current_user_permissions, attachments]);

  return (
    <>
      {buttonConfigs
        .filter((action) => action.isVisible === true)
        .map(
          ({
            label,
            icon,
            variant,
            size,
            style,
            action,
            isButton,
            component,
          }) =>
            isButton ? (
              <Button
                key={uuidv4()}
                variant={variant}
                size={size}
                className={style}
                onClick={action}
              >
                {label}
                {icon}
              </Button>
            ) : (
              <React.Fragment key={uuidv4()}>{component}</React.Fragment>
            )
        )}
    </>
  );
}
