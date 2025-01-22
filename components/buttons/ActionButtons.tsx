"use client";

import type { ActionType } from "@/hooks";
import { useWorkflowDispatcher } from "@/hooks";
import { useSTPadServerConnection } from "@/hooks/useSTPadServerConnection";
import { useLetterRevisionStore, useUserStore } from "@/lib/stores";
import type { PermissionsType } from "@/types/letter_module";
import type { UserType } from "@/types/user_module";
import { MailIcon, Send, Trash } from "lucide-react";
import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import * as uuidv4 from "uuid";
import { ActionConfirmModal, ShareLetterDialog } from "../dialogs";
import type { ActionConfirmModalRef } from "../dialogs/ActionConfirmModal";
import { SignatureAlertDialog } from "../module/stpads/Alert-dialog";
import { Button } from "../ui/button";
import ActionDropDown from "./ActionDropDown";
import SaveUpdatedLetter from "./SaveUpdatedLetter";

export type ButtonConfigType = {
	id: string;
	isVisible: boolean;
	component?: React.JSX.Element;
	label?: string | null;
	icon?: React.JSX.Element;
	variant?: "default" | "destructive" | "outline" | "third";
	size?: "default" | "icon";
	style?: string;
	action?: () => void;
};

type Props = {
	current_state: string;
	owner: UserType;
	permissions: PermissionsType;
};

function ActionButtons({ owner, current_state, permissions }: Props) {
	const { letter_type, id, reference_number, published_at, department, year } =
		useLetterRevisionStore();
	const modelRef = useRef<ActionConfirmModalRef>(null);
	const [OpenSignatureAlertDialog, setOpenSignatureAlertDialog] =
		useState(false);
	// const [signature, setSignatureImage] = useState<string | null>(null);
	const { mutate } = useWorkflowDispatcher();
	const is_staff = useUserStore(
		(state) => state.currentUser.users_permissions.is_staff
	);
	const { isConnected, isLoading, reconnect } = useSTPadServerConnection();

	const handleAction = useCallback(
		(
			actionType: ActionType,
			signature?: string | null,
			otp?: string,
			message?: string,
			reference_number?: string,
			published_at?: string
		) => {
			mutate({
				actionType,
				params: { id, signature, otp, message, reference_number, published_at },
			});
		},
		[mutate, id]
	);

	const buttonConfigs: ButtonConfigType[] = useMemo(() => {
		return [
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_trash_letter,
				variant: "outline",
				size: "icon",
				icon: <Trash size={20} className="text-red-500" />,
				action: () => handleAction("trash_letter"),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_update_letter,
				component: <SaveUpdatedLetter />,
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_restore_letter,
				label: "ወደነበረበት መልስ",
				variant: "default",
				size: "default",
				action: () => handleAction("restore_letter"),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_permanently_delete_letter,
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
							const otp: string | undefined = modelRef.current?.getOTP();
							if (!otp) return;
							handleAction("permanently_delete", undefined, otp);
						}}
						requiresAuth={true}
					/>
				),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_close_letter && is_staff,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						triggerButtonText=""
						triggerButtonTooltip="Email"
						triggerButtonIcon={<MailIcon size={20} />}
						triggerButtonSize="icon"
						triggerButtonVariant="default"
						dialogTitle="send email"
						dialogDescription="Are you sure you want to send this email"
						cancelButtonText="cancel"
						confirmButtonText="send"
						requiresAuth={false}
						onConfirm={() => {
							handleAction("send_email");
						}}
					/>
				),
			},

			{
				id: uuidv4.v4(),
				isVisible: permissions.can_share_letter,
				component: <ShareLetterDialog owner={owner} />,
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_submit_letter,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						triggerButtonText=""
						triggerButtonTooltip="ወደ መዝገብ ቢሮ አስተላልፍ"
						triggerButtonIcon={<Send size={20} />}
						triggerButtonSize="icon"
						triggerButtonVariant="default"
						dialogTitle="ወደ መዝገብ ቢሮ አስተላልፍ"
						dialogDescription="እርግጠኛ ኖት ደብዳቤውን ወደ መዝገብ ቢሮ ማስገባት ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።"
						cancelButtonText="አይ"
						confirmButtonText="አዎ"
						onConfirm={() => setOpenSignatureAlertDialog(true)}
						requiresAuth={false}
					/>
				),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_retract_letter,
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
							const otp: string | undefined = modelRef.current?.getOTP();
							if (!otp) return;
							handleAction("retract_letter", undefined, otp);
						}}
						requiresAuth={true}
					/>
				),
			},
			{
				id: uuidv4.v4(),
				isVisible: letter_type !== "incoming" && permissions.can_reject_letter,
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
							const otp: string | undefined = modelRef.current?.getOTP();
							const message: string | undefined = modelRef.current?.message;
							if (!otp || !message) return;
							handleAction("reject_letter", undefined, otp, message);
						}}
						requiresAuth={true}
						requiresMessage={true}
					/>
				),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_publish_letter,
				component: (
					<ActionConfirmModal
						ref={modelRef}
						disabledButton={
							letter_type === "incoming"
								? published_at
									? false
									: true
								: reference_number && published_at
									? false
									: true
						}
						triggerButtonText="ደብዳቤውን አከፋፍል"
						triggerButtonVariant="third"
						dialogTitle="ደብዳቤውን አከፋፍል"
						dialogDescription="እርግጠኛ ነዎት ይህን ደብዳቤ ማከፋፈል ይፈልጋሉ? እባክዎ ለመቀጠል ውሳኔዎን ያረጋግጡ።"
						cancelButtonText="አይ"
						confirmButtonText="አዎ"
						onConfirm={() => {
							const otp: string | undefined = modelRef.current?.getOTP();
							if (!otp) return;

							const newRefNo = `${department}-${reference_number}-${year}`;

							handleAction(
								"publish_letter",
								undefined,
								otp,
								undefined,
								newRefNo,
								published_at
							);
						}}
						requiresAuth={true}
						requiresMessage={false}
					/>
				),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_close_letter,
				label: "የደብዳቤውን የስራ ሂደት አጠናቅ",
				variant: "third",
				size: "default",
				action: () => handleAction("close_letter"),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_reopen_letter,
				label: "የደብዳቤውን የስራ ሂደት እንደገና ክፈት",
				variant: "default",
				size: "default",
				action: () => handleAction("reopen_letter"),
			},
			{
				id: uuidv4.v4(),
				isVisible: permissions.can_share_letter,
				component: <ActionDropDown current_state={current_state} />,
			},
		];
	}, [
		reference_number,
		published_at,
		current_state,
		handleAction,
		letter_type,
		department,
		year,
		is_staff,
		owner,
		permissions.can_close_letter,
		permissions.can_permanently_delete_letter,
		permissions.can_publish_letter,
		permissions.can_reject_letter,
		permissions.can_reopen_letter,
		permissions.can_restore_letter,
		permissions.can_retract_letter,
		permissions.can_share_letter,
		permissions.can_submit_letter,
		permissions.can_trash_letter,
		permissions.can_update_letter,
	]);
	// const [otp, setOTP] = useState<string>("");

	const uploadSignatureImage = (signatureImage: string) => {
		// setSignatureImage(signatureImage);
		// setFlag(true);
		const signature = signatureImage;
		console.log("signature", signature);
		// console.log("submitting data", "submit_letter", otp, signatureImage);
		handleAction("submit_letter", signature);
	};

	const resetSignature = () => {
		reconnect();
		// setSignatureImage(null);
	};

	return (
		<>
			<SignatureAlertDialog
				open={OpenSignatureAlertDialog}
				setOpen={setOpenSignatureAlertDialog}
				isConnected={isConnected}
				isLoading={isLoading}
				uploadSignatureImage={uploadSignatureImage}
				resetSignature={resetSignature}
				reconnect={reconnect}
			/>
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
