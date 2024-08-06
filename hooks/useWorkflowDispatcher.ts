import {
	moveToTrash,
	moveToTrashBatch,
	permanentlyDelete,
	permanentlyDeleteBatch,
	restoreFromTrash,
	restoreFromTrashBatch,
} from "@/actions/letter_module/crudActions";
import {
	closeLetter,
	publishLetter,
	rejectLetter,
	reopenLetter,
	retractLetter,
	submitLetter,
} from "@/actions/letter_module/workflowActions";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export type ActionType =
	| "close_letter"
	| "publish_letter"
	| "reject_letter"
	| "permanently_delete"
	| "reopen_letter"
	| "retract_letter"
	| "restore_letter"
	| "trash_letter"
	| "submit_letter"
	| "moveToTrash_batch"
	| "restoreFromTrash_batch"
	| "permanently_delete_batch";

export type ParamsType = {
	referenceNumber: string | string[]; // Adjusted to handle both single and multiple reference numbers
	otp?: number;
};

export type PropType = {
	actionType: ActionType;
	params: ParamsType;
};

const actionDispatcher = async ({ actionType, params }: PropType) => {
	const referenceNumbers = Array.isArray(params.referenceNumber)
		? params.referenceNumber
		: [params.referenceNumber];

	switch (actionType) {
		case "close_letter":
			return await closeLetter(referenceNumbers[0]);
		case "publish_letter":
			return await publishLetter({
				referenceNumber: referenceNumbers[0],
				otp: params.otp,
			});
		case "reject_letter":
			return await rejectLetter({
				referenceNumber: referenceNumbers[0],
				otp: params.otp,
			});
		case "permanently_delete":
			return await permanentlyDelete({
				referenceNumber: referenceNumbers[0],
				otp: params.otp,
			});
		case "moveToTrash_batch":
			return await moveToTrashBatch({
				referenceNumbers,
			});
		case "restoreFromTrash_batch":
			return await restoreFromTrashBatch({
				referenceNumbers,
			});
		case "permanently_delete_batch":
			return await permanentlyDeleteBatch({
				referenceNumbers,
				otp: params.otp,
			});
		case "reopen_letter":
			return await reopenLetter(referenceNumbers[0]);
		case "retract_letter":
			return await retractLetter({
				referenceNumber: referenceNumbers[0],
				otp: params.otp,
			});
		case "restore_letter":
			return await restoreFromTrash(referenceNumbers[0]);
		case "submit_letter":
			return await submitLetter({
				referenceNumber: referenceNumbers[0],
			});
		case "trash_letter":
			return await moveToTrash(referenceNumbers[0]);
		default:
			throw new Error("Invalid action type");
	}
};

export default function useWorkflowDispatcher() {
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ["letter-workflow"],
		mutationFn: async (action: PropType) => {
			const response = await actionDispatcher(action);

			if (!response.ok) throw response;

			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ጥያቄዎን በማስተናገድ ላይ፣ እባክዎን ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success(data.message);
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	return {
		mutate,
		isPending,
		isSuccess,
	};
}
