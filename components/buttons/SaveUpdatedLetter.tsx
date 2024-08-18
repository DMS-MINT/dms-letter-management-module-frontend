import { updateLetter } from "@/actions/letter_module/crudActions";
import { useToastMutation } from "@/hooks";
import { useLetterRevisionStore } from "@/lib/stores";
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
	const { mutate } = useToastMutation<[string, ModifiedLetterType]>(
		"updateLetter",
		updateLetter,
		"ለውጦችን በማስቀመጥ ላይ፣ እባክዎ ይጠብቁ..."
	);

	const draft_participants = useMemo(() => {
		return generateDraftParticipant(participants);
	}, [participants]);

	const onSubmit = () => {
		const letter: ModifiedLetterType = {
			subject,
			body,
			participants: draft_participants,
		};
		mutate([reference_number, letter]);
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
