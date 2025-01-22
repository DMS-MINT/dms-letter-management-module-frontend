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
	sendEmail,
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
	| "permanently_delete_batch"
	| "send_email";

export type ParamsType = {
	id: string | string[]; // Adjusted to handle both single and multiple reference numbers
	otp?: string;
	message?: string;
	reference_number?: string;
	published_at?: string;
	signature?: string | null;
};

export type PropType = {
	actionType: ActionType;
	params: ParamsType;
};

const actionDispatcher = async ({ actionType, params }: PropType) => {
	const ids = Array.isArray(params.id) ? params.id : [params.id];

	switch (actionType) {
		case "close_letter":
			return await closeLetter(ids[0]);
		case "send_email":
			return await sendEmail(ids[0]);
		case "publish_letter":
			return await publishLetter({
				id: ids[0],
				otp: params.otp,
				reference_number: params.reference_number,
				published_at: params.published_at,
			});
		case "reject_letter":
			return await rejectLetter({
				id: ids[0],
				otp: params.otp,
				message: params.message,
			});
		case "permanently_delete":
			return await permanentlyDelete({
				id: ids[0],
				otp: params.otp,
			});
		case "moveToTrash_batch":
			return await moveToTrashBatch({
				id: ids,
			});
		case "restoreFromTrash_batch":
			return await restoreFromTrashBatch({
				id: ids,
			});
		case "permanently_delete_batch":
			return await permanentlyDeleteBatch({
				id: ids,
				otp: params.otp,
			});
		case "reopen_letter":
			return await reopenLetter(ids[0]);
		case "retract_letter":
			return await retractLetter({
				id: ids[0],
				otp: params.otp,
			});
		case "restore_letter":
			return await restoreFromTrash(ids[0]);
		case "submit_letter":
			return await submitLetter({
				id: params.id,
				signature: params.signature,
				// otp: params.otp,
			});
		case "trash_letter":
			return await moveToTrash(ids[0]);
		default:
			throw new Error("Invalid action type");
	}
};

export default function useWorkflowDispatcher() {
	const { mutate, isPending, isSuccess } = useMutation({
		mutationKey: ["letter-workflow"],
		mutationFn: async (action: PropType) => {
			console.log("Action", action);
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
