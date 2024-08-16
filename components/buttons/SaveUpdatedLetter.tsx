import { updateLetter } from "@/actions/letter_module/crudActions";
import { useLetterRevisionStore } from "@/lib/stores";
import { generateDraftParticipant } from "@/lib/utils/participantUtils";
import type {
	LetterDetailType,
	ModifiedLetterType,
} from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export default function SaveUpdatedLetter() {
	const { referenceNumber } = useParams();
	const { subject, body, participants } = useLetterRevisionStore();

	const { mutate } = useMutation({
		mutationKey: ["updateLetter"],
		mutationFn: async (letter: ModifiedLetterType) => {
			const response = await updateLetter(referenceNumber as string, letter);

			if (!response.ok) throw response;

			return response.message as LetterDetailType;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ለውጦችን በማስቀመጥ ላይ፣ እባክዎ ይጠብቁ...");
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("ለውጦችን በተሳካ ሁኔታ ተቀምጠዋል።");
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
		const letter: ModifiedLetterType = {
			subject,
			body,
			participants: draft_participants,
		};
		mutate(letter);
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Button variant={"outline"} onClick={onSubmit} size={"sm"}>
						<Pencil size={15} className="text-green-500" />
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom" align="center">
					<p>ደብዳቤውን አርም</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
