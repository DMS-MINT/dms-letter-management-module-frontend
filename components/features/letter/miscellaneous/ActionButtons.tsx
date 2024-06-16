"use client";

import { Button } from "@/components/ui/button";
import {
  deleteLetter,
  selectLetterDetails,
  updateLetter,
} from "@/lib/features/letter/letterSlice";
import { selectPermissions } from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateLetterSerializer } from "@/utils";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IButtonConfig {
  isVisible: boolean;
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
  const permissions = useAppSelector(selectPermissions);
  const [buttonConfigs, setButtonConfigs] = useState<IButtonConfig[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (Object.keys(permissions).length > 0) {
      const configs: IButtonConfig[] = [
        {
          isVisible: permissions.can_delete,
          variant: "outline",
          style: "",
          size: "icon",
          icon: <Trash size={20} />,
          action: () => {
            console.log("DELETE LETTER");
          },
        },
        {
          isVisible: permissions.can_share,
          label: "ደብዳቤውን አጋራ",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {
            console.log("SHARE LETTER");
          },
        },
        {
          isVisible: permissions.can_edit,
          label: "አርም",
          variant: "outline",
          style: "",
          size: "default",
          action: () => {
            const serializedLetter = updateLetterSerializer(letterDetails);

            dispatch(
              updateLetter({
                reference_number: letterDetails.reference_number,
                letter: serializedLetter,
              })
            );
          },
        },
        {
          isVisible: permissions.can_submit,
          label: "ደብዳቤውን ላክ",
          variant: "default",
          style: "",
          size: "default",
          action: () => {
            console.log("SUBMIT A REQUEST FOR THE LETTER TO BE PUBLISHED");
          },
        },
        {
          isVisible: permissions.can_retract,
          label: "ሰርዝ",
          variant: "destructive",
          style: "",
          size: "default",
          action: () => {
            console.log("RETRACT LETTER PUBLISH REQUEST");
          },
        },
        {
          isVisible: permissions.can_reject,
          label: "ደብዳቤ አትቀበል",
          variant: "destructive",
          style: "",
          size: "default",
          action: () => {
            console.log("REJECT LETTER PUBLISH REQUEST");
          },
        },
        {
          isVisible: permissions.can_publish,
          label: "ደብዳቤ ያትሙ",
          variant: "third",
          style: "",
          size: "default",
          action: () => {
            console.log("ACCEPT LETTER PUBLISH REQUEST");
          },
        },
        {
          isVisible: permissions.can_close,
          label: "ደብዳቤውን ዝጋ",
          variant: "default",
          style: "",
          size: "default",
          action: () => {
            console.log("ACCEPT LETTER PUBLISH REQUEST");
          },
        },
      ];
      setButtonConfigs(configs);
    }
  }, [letterDetails, permissions]);

  const dispatchLetterUpdate = () => {};

  const dispatchLetterDelete = () => {
    dispatch(deleteLetter(letterDetails.reference_number));
  };

  return (
    <>
      {buttonConfigs
        .filter((action) => action.isVisible === true)
        .map(({ label, icon, variant, size, style, action }) => (
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
        ))}
    </>
  );
}
