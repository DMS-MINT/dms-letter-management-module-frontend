"use client";

import {
	createAndPublishLetter,
	createAndSubmitLetter,
} from "@/actions/letter_module/crudActions";
import { Button } from "@/components/ui/button";
import { useOTP } from "@/hooks";
import { useSTPadServerConnection } from "@/hooks/useSTPadServerConnection";
import {
	type LetterStoreType,
	useDraftAttachmentStore,
	useDraftLetterStore,
} from "@/lib/stores";
import canSubmitLetter from "@/lib/utils/canSubmitLetter";
import { generateDraftParticipant } from "@/lib/utils/participantUtils";
import type {
	DraftLetterType,
	LetterDetailResponseType,
} from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { shallow } from "zustand/shallow";
import { SignatureAlertDialog } from "../module/stpads/Alert-dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export type ActionType = "create_and_submit" | "create_and_publish";

export type LetterActionProps = {
	actionType: ActionType;
	formData: FormData;
};

export default function SubmitLetterDialog({
	actionType,
}: {
	actionType: ActionType;
}) {
	const { isConnected, isLoading, reconnect } = useSTPadServerConnection();

	// Use shallow comparison for efficient state updates
	// const { isConnected, isLoading } = useSTPadStore();
	// const isConnected = true;
	// const isLoading = false;
	// const {isConnected, isLoading} = useSTPadServerConnection();
	const {
		subject,
		body,
		letter_type,
		language,
		participants,
		id,
		current_state,
		department,
		year,
	} = useDraftLetterStore(
		(state: LetterStoreType) => ({
			subject: state.subject,
			body: state.body,
			letter_type: state.letter_type,
			language: state.language,
			participants: state.participants,
			id: state.id,
			current_state: state.current_state,
			department: state.department,
			year: state.year,
		}),
		shallow
	);

	const { newAttachments } = useDraftAttachmentStore();
	const { form, getOTP, handleInputChange } = useOTP();
	const [OpenSignatureAlertDialog, setOpenSignatureAlertDialog] =
		useState(false);
	const router = useRouter();
	const [signatureImage, setSignatureImage] = useState<string | null>(null);

	// Action dispatcher for submitting or publishing a letter
	const actionDispatcher = async ({
		actionType,
		formData,
	}: LetterActionProps) => {
		switch (actionType) {
			case "create_and_submit":
				return await createAndSubmitLetter(formData);
			case "create_and_publish":
				return await createAndPublishLetter(formData);
			default:
				throw new Error("Invalid action type");
		}
	};

	// Mutation for handling the form submission
	const { mutate, isPending } = useMutation({
		mutationKey: ["createLetter"],
		mutationFn: async (action: LetterActionProps) => {
			const response = await actionDispatcher(action);

			if (!response.ok) throw response;

			return response.message as LetterDetailResponseType;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ደብዳቤ በመፍጠር ላይ፣ እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success("ደብዳቤ በተሳካ ሁኔታ ተፈጥሯል!");
			router.push(`/letters/draft/${data.letter.id}`);
		},
		onError: (error: any) => {
			toast.dismiss();
			// toast.success("ፊርማዎ ተመሳሳይ ነው፡፡ ደብዳቤ በተሳካ ሁኔታ ተፈጥሯል!");
			toast.error(
				"Signature verification failed. Please Try again or contact support."
			);
		},
	});

	// Memoize draft participants to avoid unnecessary recalculations
	const draft_participants = useMemo(() => {
		return generateDraftParticipant(participants);
	}, [participants]);

	// Handle form submission

	const resetSignature = () => {
		reconnect();
		setSignatureImage(null);
	};

	const onContinue = (signatureImage: string) => {
		const formData = new FormData();
		const letter: DraftLetterType = {
			subject,
			body,
			letter_type,
			language,
			participants: draft_participants,
		};
		formData.append("letter", JSON.stringify(letter));
		formData.append("signature", signatureImage);

		newAttachments.forEach((attachment, index) => {
			formData.append(`attachments[${index}].file`, attachment.file);
			formData.append(`attachments[${index}].description`, attachment.description);
		});

		const action: LetterActionProps = {
			actionType,
			formData,
		};
		mutate(action);
	};

	const uploadSignatureImage = (signatureImage: string) => {
		console.log(signatureImage);
		setSignatureImage(signatureImage);
		onContinue(signatureImage);
	};

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							type="button"
							disabled={
								!canSubmitLetter({
									subject,
									body,
									letter_type,
									language,
									participants,
									id,
									current_state,
									department,
									year,
								})
							}
							onClick={() => {
								form.reset();

								setOpenSignatureAlertDialog(true);
							}}
						>
							<Send size={15} />
						</Button>
					</TooltipTrigger>
					<TooltipContent side="bottom" align="center">
						<p>ወደ መዝገብ ቢሮ አስተላልፍ</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<SignatureAlertDialog
				open={OpenSignatureAlertDialog}
				setOpen={setOpenSignatureAlertDialog}
				isConnected={isConnected}
				isLoading={isLoading}
				uploadSignatureImage={uploadSignatureImage}
				resetSignature={resetSignature}
				reconnect={reconnect}
			/>
		</>
	);
}
