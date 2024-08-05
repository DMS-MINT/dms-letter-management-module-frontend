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
import { useLetterStore, useParticipantStore } from "@/stores";
import type {
	DraftLetterType,
	LetterDetailResponseType,
} from "@/types/letter_module";
import { canSubmitLetter } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { OTPInputForm } from "../forms";

export type ActionType = "create_and_submit" | "create_and_publish";

export type CreateLetterParams = {
	letter: DraftLetterType;
	otp: number;
};

export type LetterActionProps = {
	actionType: ActionType;
	params: CreateLetterParams;
};

export default function SubmitLetterDialog({
	actionType,
}: {
	actionType: ActionType;
}) {
	const participants = useParticipantStore((state) => state.participants);
	const letter = useLetterStore((state) => ({
		subject: state.subject,
		content: state.content,
		letter_type: state.letter_type,
		language: state.language,
	}));

	const { form, getOTP, handleInputChange } = useOTP();
	const router = useRouter();

	const actionDispatcher = async ({ actionType, params }: LetterActionProps) => {
		switch (actionType) {
			case "create_and_submit":
				return await createAndSubmitLetter(params);
			case "create_and_publish":
				return await createAndPublishLetter(params);
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

	const onContinue = (otp: number) => {
		const action: LetterActionProps = {
			actionType,
			params: {
				letter: {
					subject: letter.subject,
					content: letter.content,
					letter_type: letter.letter_type,
					language: letter.language,
					participants,
				},
				otp: otp,
			},
		};
		mutate(action);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					disabled={!canSubmitLetter(letter, participants)}
					onClick={() => {
						form.reset();
					}}
				>
					ወደ መዝገብ ቢሮ አስተላልፍ
				</Button>
			</DialogTrigger>
			<DialogContent className="">
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
					<OTPInputForm form={form} onChange={handleInputChange} />
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
