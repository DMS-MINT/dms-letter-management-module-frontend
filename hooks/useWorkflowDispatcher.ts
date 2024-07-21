import {
	close_letter,
	publish_letter,
	reject_letter,
	reopen_letter,
	retract_letter,
	share_letter,
	submit_letter,
} from "@/lib/features/letter/workflow/actions";
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
			return await share_letter(params.reference_number, params.participants!);
		case "submit_letter":
			return await submit_letter(params.reference_number);
		case "publish_letter":
			return await publish_letter(params.reference_number);
		case "reject_letter":
			return await reject_letter(params.reference_number);
		case "retract_letter":
			return await retract_letter(params.reference_number);
		case "close_letter":
			return await close_letter(params.reference_number);
		case "reopen_letter":
			return await reopen_letter(params.reference_number);
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
