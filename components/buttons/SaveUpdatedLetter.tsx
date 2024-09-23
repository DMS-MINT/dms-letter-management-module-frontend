import { updateLetter } from "@/actions/letter_module/crudActions";
import { useToastMutation } from "@/hooks";
import {
	useAttachmentRevisionStore,
	useLetterRevisionStore,
} from "@/lib/stores";
import { generateDraftParticipant } from "@/lib/utils/participantUtils";
import type { ModifiedLetterType } from "@/types/letter_module";
import { Pencil } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export default function SaveUpdatedLetter() {
	const { subject, body, participants, reference_number } =
		useLetterRevisionStore();
	const { newAttachments, removedAttachmentsIds } = useAttachmentRevisionStore();
	const { mutate } = useToastMutation<[string, FormData]>(
		"updateLetter",
		updateLetter,
		"ለውጦችን በማስቀመጥ ላይ፣ እባክዎ ይጠብቁ..."
	);

	const draft_participants = useMemo(() => {
		return generateDraftParticipant(participants);
	}, [participants]);

	const onSubmit = () => {
		const formData = new FormData();
		const letter: ModifiedLetterType = {
			subject,
			body,
			participants: draft_participants,
			removedAttachmentsIds: removedAttachmentsIds,
		};
		formData.append("letter", JSON.stringify(letter));

		newAttachments.forEach((attachment, index) => {
			formData.append(`attachments[${index}].file`, attachment.file);
			formData.append(`attachments[${index}].description`, attachment.description);
		});

		mutate([reference_number, formData]);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant={"outline"} onClick={onSubmit} size={"icon"}>
						<Pencil size={20} className="text-green-500" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" align="center">
					<p>ደብዳቤውን አርም</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
