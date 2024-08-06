import { updateLetter } from "@/actions/letter_module/crudActions";
import { useLetterStore, useParticipantStore } from "@/stores";
import type {
	LetterDetailType,
	ModifiedLetterType,
} from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function SaveUpdatedLetter() {
	const { referenceNumber } = useParams();
	const participants = useParticipantStore((state) => state.participants);
	const { subject, content } = useLetterStore((state) => ({
		subject: state.subject,
		content: state.content,
	}));

	const { mutate } = useMutation({
		mutationKey: ["createLetter"],
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

	const onSubmit = () => {
		const letter: ModifiedLetterType = {
			subject,
			content,
			participants,
		};
		mutate(letter);
	};

	return (
		<Button variant={"outline"} onClick={onSubmit}>
			ደብዳቤውን አርም
		</Button>
	);
}
