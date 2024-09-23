"use client";

import {
	createAndPublishLetter,
	createAndSubmitLetter,
} from "@/actions/letter_module/crudActions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { LINKS } from "@/constants";
import { useOTP } from "@/hooks";
import { useDraftAttachmentStore, useDraftLetterStore } from "@/lib/stores";
import canSubmitLetter from "@/lib/utils/canSubmitLetter";
import { generateDraftParticipant } from "@/lib/utils/participantUtils";
import type {
	DraftLetterType,
	LetterDetailResponseType,
} from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { OTPInputForm } from "../forms";
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
	const { subject, body, letter_type, language, participants } =
		useDraftLetterStore((state) => ({
			subject: state.subject,
			body: state.body,
			letter_type: state.letter_type,
			language: state.language,
			participants: state.participants,
		}));
	const { newAttachments } = useDraftAttachmentStore();

	const { form, getOTP, handleInputChange } = useOTP();
	const router = useRouter();

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
			router.push(`/letters/draft/${data.letter.reference_number}`);
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const draft_participants = useMemo(() => {
		return generateDraftParticipant(participants);
	}, [participants]);

	const onContinue = (otp: string) => {
		const formData = new FormData();
		const letter: DraftLetterType = {
			subject,
			body,
			letter_type,
			language,
			participants: draft_participants,
		};
		formData.append("letter", JSON.stringify(letter));

		newAttachments.forEach((attachment, index) => {
			formData.append(`attachments[${index}].file`, attachment.file);
			formData.append(`attachments[${index}].description`, attachment.description);
		});

		formData.append("otp", JSON.stringify(otp));

		const action: LetterActionProps = {
			actionType,
			formData,
		};
		mutate(action);
	};

	return (
		<Dialog>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button
								type="button"
								disabled={
									!canSubmitLetter({
										subject,
										body,
										letter_type,
										language,
										participants,
									})
								}
								onClick={() => {
									form.reset();
								}}
							>
								<Send size={15} />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent side="bottom" align="center">
						<p>ወደ መዝገብ ቢሮ አስተላልፍ</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent>
				<DialogHeader className="gap-2">
					<DialogTitle>ማንነትዎን ያረጋግጡ</DialogTitle>
					<DialogDescription>
						ይህን ደብዳቤ ደህንነቱ በተጠበቀ መልኩ ለመፈረም፣ እባክዎ በእርስዎ
						{
							<Link
								href={LINKS.google_authenticator}
								className="text-blue-800"
								target="_blank"
							>
								{" Google Authenticator "}
							</Link>
						}
						መተግበሪያ የመነጨውን የአንድ ጊዜ የይለፍ ቃል ያስገቡ።
					</DialogDescription>
				</DialogHeader>
				<div className="px-2">
					<OTPInputForm showLabel={true} form={form} onChange={handleInputChange} />
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">ሰርዝ</Button>
					</DialogClose>
					<Button
						disabled={getOTP()?.toString().length !== 6 || isPending}
						type="submit"
						onClick={() => {
							const otp = getOTP();
							onContinue(otp);
						}}
					>
						ቀጥል
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
