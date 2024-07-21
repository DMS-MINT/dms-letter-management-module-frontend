"use client";

import { Button } from "@/components/ui/button";
import {
	moveToTrash,
	resetAttachments,
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
} from "@/lib/features/letter/workflow/workflowSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { generateUserPermissions, letterSerializer } from "@/utils";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import PermanentlyDeleteDialog from "../deleteDialog/PermanentlyDeleteDialog";
import { ShareLetter, SubmitLetter } from "@/components/features/workflow";
import { PermanentlyDeleteLetter } from "@/components/features/trash";
import {
	LetterDetailResponseType,
	PermissionsType,
} from "@/types/letter_module";
import { useWorkflowDispatcher } from "@/hooks";
import type { PropType } from "@/hooks";
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

export default function ActionButtons({
	data,
}: {
	data: LetterDetailResponseType;
}) {
	const { mutate } = useWorkflowDispatcher();
	const letterDetails = useAppSelector(selectLetterDetails);
	const attachments = useAppSelector(selectAttachments);
	const [buttonConfigs, setButtonConfigs] = useState<IButtonConfig[]>([]);
	const [currentUserPerms, setCurrentUserPerms] = useState<PermissionsType>({
		can_view_letter: false,
		can_update_letter: false,
		can_submit_letter: false,
		can_comment_letter: false,
		can_share_letter: false,
		can_trash_letter: false,
		can_restore_letter: false,
		can_remove_from_trash_letter: false,
		can_retract_letter: false,
		can_archive_letter: false,
		can_close_letter: false,
		can_publish_letter: false,
		can_reject_letter: false,
		can_reopen_letter: false,
	});
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleClick = (action: PropType) => {
		mutate(action);
	};

	useEffect(() => {
		const userPermissions = generateUserPermissions(data);

		setCurrentUserPerms(userPermissions);
	}, [data]);

	useEffect(() => {
		const configs: IButtonConfig[] = [
			{
				isVisible: currentUserPerms.can_trash_letter,
				isButton: true,
				variant: "outline",
				style: "",
				size: "icon",
				icon: <Trash size={20} />,
				action: () => {},

				// action: () => {
				// 	dispatch(moveToTrash(letterDetails.reference_number));
				// },
			},
			{
				isVisible: currentUserPerms.can_share_letter,
				isButton: false,
				component: <ShareLetter />,
				label: "ደብዳቤውን አጋራ",
				variant: "outline",
				style: "",
				size: "default",
				action: () => {},
			},
			{
				isVisible: currentUserPerms.can_restore_letter,
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
				isVisible: currentUserPerms.can_remove_from_trash_letter,
				isButton: false,
				component: <PermanentlyDeleteLetter />,
				label: "remove",
				variant: "outline",
				style: "",
				size: "default",
				action: () => {},
			},
			{
				isVisible: currentUserPerms.can_update_letter,
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
				isVisible: currentUserPerms.can_submit_letter,
				isButton: false,
				component: <SubmitLetter />,
				label: "ወደ መዝገብ ቢሮ አስተላልፍ",
				variant: "default",
				style: "",
				size: "default",
				action: () => {},
			},
			{
				isVisible:
					letterDetails?.letter_type === "incoming" &&
					currentUserPerms.can_publish_letter,
				isButton: false,
				component: <SubmitLetter />,
				label: "ወደ መዝገብ ቢሮ አስተላልፍ",
				variant: "default",
				style: "",
				size: "default",
				action: () => {},
			},
			{
				isVisible: currentUserPerms.can_retract_letter,
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
					currentUserPerms.can_reject_letter,
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
					currentUserPerms.can_publish_letter,
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
				isVisible: currentUserPerms.can_close_letter,
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
				isVisible: currentUserPerms.can_reopen_letter,
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
	}, [data, currentUserPerms, attachments]);

	return (
		<>
			{buttonConfigs
				.filter((action) => action.isVisible === true)
				.map(({ label, icon, variant, size, style, action, isButton, component }) =>
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
