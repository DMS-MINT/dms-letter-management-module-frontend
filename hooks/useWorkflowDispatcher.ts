import {
	closeLetter,
	publishLetter,
	rejectLetter,
	reopenLetter,
	retractLetter,
	shareLetter,
	submitLetter,
} from "@/actions/letter_module/workflowActions";
import { ShareLetterRequestType } from "@/types/letter_module";
import { useMutation } from "@tanstack/react-query";

type ParamType = {
	reference_number: string;
	participants?: ShareLetterRequestType;
};

export type PropType = {
	actionType: string;
	params: ParamType;
};

const actionDispatcher = async ({ actionType, params }: PropType) => {
	switch (actionType) {
		case "share_letter":
			return await shareLetter(params.reference_number, params.participants!);
		case "submit_letter":
			return await submitLetter(params.reference_number);
		case "publish_letter":
			return await publishLetter(params.reference_number);
		case "reject_letter":
			return await rejectLetter(params.reference_number);
		case "retract_letter":
			return await retractLetter(params.reference_number);
		case "close_letter":
			return await closeLetter(params.reference_number);
		case "reopen_letter":
			return await reopenLetter(params.reference_number);
		default:
			throw new Error("Invalid action type");
	}
};

export default function useWorkflowDispatcher() {
	const { mutate } = useMutation({
		mutationKey: ["letter-workflow"],
		mutationFn: actionDispatcher,
		onMutate: () => {},
		onSuccess: () => {},
		onError: () => {},
	});

	return {
		mutate,
	};
}
