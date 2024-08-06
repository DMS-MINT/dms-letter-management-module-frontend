import {
	moveToTrash,
	permanentlyDelete,
	restoreFromTrash,
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
	| "submit_letter";

export type ParamsType = {
	referenceNumber: string;
	otp?: number;
};

export type PropType = {
	actionType: ActionType;
	params: ParamsType;
};

const actionDispatcher = async ({ actionType, params }: PropType) => {
	switch (actionType) {
		case "close_letter":
			return await closeLetter(params.referenceNumber);
		case "publish_letter":
			return await publishLetter({
				referenceNumber: params.referenceNumber,
				otp: params.otp,
			});
		case "reject_letter":
			return await rejectLetter({
				referenceNumber: params.referenceNumber,
				otp: params.otp,
			});
		case "permanently_delete":
			return await permanentlyDelete({
				referenceNumber: params.referenceNumber,
				otp: params.otp,
			});
		case "reopen_letter":
			return await reopenLetter(params.referenceNumber);
		case "retract_letter":
			return await retractLetter({
				referenceNumber: params.referenceNumber,
				otp: params.otp,
			});
		case "restore_letter":
			return await restoreFromTrash(params.referenceNumber);
		case "submit_letter":
			return await submitLetter({
				referenceNumber: params.referenceNumber,
				otp: params.otp,
			});
		case "trash_letter":
			return await moveToTrash(params.referenceNumber);
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
