"use client";

import { Button } from "@/components/ui/button";
import { generateUserPermissions } from "@/utils";
import React, { memo, useMemo, useRef } from "react";
import { LetterDetailResponseType } from "@/types/letter_module";
import { useWorkflowDispatcher } from "@/hooks";
import {
	PermanentlyDeleteDialog,
	ShareLetterDialog,
	SubmitLetterDialog,
} from "@/components/letter_module";
import { Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { ActionType, PropType } from "@/hooks";
import { ActionConfirmModal } from "../shared";
import { ActionConfirmModalRef } from "../shared/ActionConfirmModal";

export type ButtonConfigType = {
	id: string;
	isVisible: boolean;
	component?: JSX.Element;
	label?: string | null;
	icon?: JSX.Element;
	variant?: "default" | "destructive" | "outline" | "third";
	size?: "default" | "icon";
	style?: string;
	action?: () => void;
};

function ActionButtons({
	data: { letter, permissions },
}: {
	data: LetterDetailResponseType;
}) {
	const modelRef = useRef<ActionConfirmModalRef>(null);
	const { mutate } = useWorkflowDispatcher();

	const handleAction = (actionType: ActionType, otp?: number) => {
		mutate({
			actionType,
			params: { referenceNumber: letter.reference_number, otp: otp },
		});
	};

	const buttonConfigs: ButtonConfigType[] = useMemo(() => {
		const currentUserPerms = generateUserPermissions(permissions);

		return [
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_trash_letter,
				variant: "outline",
				size: "icon",
				icon: <Trash size={20} />,
				action: () => handleAction("trash_letter"),
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_share_letter,
				component: <ShareLetterDialog letter={letter} />,
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_restore_letter,
				label: "ወደነበረበት መልስ",
				variant: "default",
				size: "default",
				action: () => handleAction("restore_letter"),
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_permanently_delete_letter,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						triggerButtonText="በቋሚነት ያስወግዱ"
						triggerButtonVariant="destructive"
						dialogTitle="ደብዳቤውን በቋሚነት አጥፋ"
						dialogDescription="እርግጠኛ ነዎት ይህን ደብዳቤ እስከመጨረሻው መሰረዝ ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።"
						cancelButtonText="አይ"
						confirmButtonText="አዎ"
						onConfirm={() => {
							const otp: number | undefined = modelRef.current?.getOTP();
							if (!otp) return;
							handleAction("permanently_delete", otp);
						}}
						requiresAuth={true}
					/>
				),
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_submit_letter,
				component: <SubmitLetterDialog letter={letter} />,
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_retract_letter,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						triggerButtonText="ለክለሳ መልስ"
						triggerButtonVariant="destructive"
						dialogTitle="ለክለሳ ደብዳቤ መልስ"
						dialogDescription="እርግጠኛ ነዎት ይህን ደብዳቤ ለክለሳ መመለስ ይፈልጋሉ? ይህ እርምጃ ደብዳቤውን ከታተመ ዝርዝር ውስጥ ያስወግዳል, ይህም አስፈላጊ ለውጦችን እንዲያደርጉ ያስችልዎታል. እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።"
						cancelButtonText="አይ"
						confirmButtonText="አዎ"
						onConfirm={() => {
							const otp: number | undefined = modelRef.current?.getOTP();
							if (!otp) return;
							handleAction("retract_letter", otp);
						}}
						requiresAuth={true}
					/>
				),
			},
			{
				id: uuidv4(),
				isVisible:
					letter.letter_type !== "incoming" && currentUserPerms.can_reject_letter,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						triggerButtonText="ደብዳቤውን አትቀበል"
						triggerButtonVariant="destructive"
						dialogTitle="ደብዳቤውን አትቀበል"
						dialogDescription="እርግጠኛ ነዎት ይህን ደብዳቤ አለመቀበል ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።"
						cancelButtonText="አይ"
						confirmButtonText="አዎ"
						onConfirm={() => {
							const otp: number | undefined = modelRef.current?.getOTP();
							if (!otp) return;
							handleAction("reject_letter", otp);
						}}
						requiresAuth={true}
					/>
				),
			},
			{
				id: uuidv4(),
				isVisible:
					letter.letter_type !== "incoming" && currentUserPerms.can_publish_letter,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						triggerButtonText="ደብዳቤውን አከፋፍል"
						triggerButtonVariant="third"
						dialogTitle="ደብዳቤውን አከፋፍል"
						dialogDescription="እርግጠኛ ነዎት ይህን ደብዳቤ ማከፋፈል ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።"
						cancelButtonText="አይ"
						confirmButtonText="አዎ"
						onConfirm={() => {
							const otp: number | undefined = modelRef.current?.getOTP();
							if (!otp) return;
							handleAction("publish_letter", otp);
						}}
						requiresAuth={true}
					/>
				),
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_close_letter,
				label: "የደብዳቤውን የስራ ሂደት አጠናቅ",
				variant: "third",
				size: "default",
				action: () => handleAction("close_letter"),
			},
			{
				id: uuidv4(),
				isVisible: currentUserPerms.can_reopen_letter,
				label: "የደብዳቤውን የስራ ሂደት እንደገና ክፈት",
				variant: "default",
				size: "default",
				action: () => handleAction("reopen_letter"),
			},
		];
	}, [letter, permissions]);

	return (
		<>
			{buttonConfigs
				.filter((action) => action.isVisible === true)
				.map(({ id, label, icon, variant, size, style, action, component }) =>
					!component ? (
						<Button
							key={id}
							variant={variant}
							size={size}
							className={style}
							onClick={action}
						>
							{label}
							{icon}
						</Button>
					) : (
						<React.Fragment key={id}>{component}</React.Fragment>
					)
				)}
		</>
	);
}

export default memo(ActionButtons);
