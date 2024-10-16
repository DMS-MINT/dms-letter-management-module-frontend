"use client";

import { createLetter } from "@/actions/letter_module/crudActions";
import { useDraftAttachmentStore, useDraftLetterStore } from "@/lib/stores";
import { generateDraftParticipant } from "@/lib/utils/participantUtils";
import type { DraftLetterType, LetterDetailType } from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { SubmitLetterDialog } from "../dialogs";
import { Button } from "../ui/button";

export default function ComposeControlPanel() {
	const {
		subject,
		body,
		letter_type,
		language,
		participants,
		resetContent,
		resetParticipants,
	} = useDraftLetterStore();
	const { newAttachments } = useDraftAttachmentStore();

	const router = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["createLetter"],
		mutationFn: async (formData: FormData) => {
			const response = await createLetter(formData);

			if (!response.ok) throw response;

			return response.message as LetterDetailType;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ደብዳቤዎን በመፍጠር ላይ፣ እባክዎን ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			console.log("Letter data:", data);
			toast.success("ደብዳቤዎ በተሳካ ሁኔታ ተፈጥሯል!");
			resetContent();
			resetParticipants();
			if (data.current_state === "Draft") {
				console.log("Letter data:", data);
				router.push(`/letters/draft/${data.id}`);
			} else {
				router.push(`/letters/outbox/${data.id}`);
			}
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const draft_participants = useMemo(() => {
		return generateDraftParticipant(participants);
	}, [participants]);

	const onSubmit = () => {
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

		mutate(formData);
	};

	const renderDialog = useMemo(() => {
		switch (letter_type) {
			case "internal":
				return <SubmitLetterDialog actionType="create_and_submit" />;
			case "outgoing":
				return <SubmitLetterDialog actionType="create_and_submit" />;
			case "incoming":
				// return <SubmitLetterDialog actionType="create_and_publish" />;
				return;
			default:
				throw new Error("Invalid letter type");
		}
	}, [letter_type]);

	return (
		<section className="top-0 flex w-full items-center justify-between">
			<div className="flex items-center gap-4">
				<h1 className="text-xl font-semibold">አዲስ ደብዳቤ</h1>
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="mr-0 rounded-md border-gray-300"
					variant="outline"
					onClick={onSubmit}
				>
					ረቂቁን ያስቀምጡ
				</Button>
				{renderDialog}
			</div>
		</section>
	);
}
