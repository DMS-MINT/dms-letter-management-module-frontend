import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { toast } from "sonner";

type APIResponseType = {
	ok: boolean;
	message: string;
};

type MutationFunctionType<TParams> = (
	_params: TParams
) => Promise<APIResponseType>;

export default function useToastMutation<TParams>(
	mutationKey: unknown,
	mutationFn: MutationFunctionType<TParams>,
	loadingMessage: string
): UseMutationResult<APIResponseType, unknown, TParams, unknown> {
	return useMutation({
		mutationKey: [mutationKey],
		mutationFn: async (params: TParams) => {
			const response = await mutationFn(params);

			if (!response.ok) throw response;

			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading(loadingMessage);
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
}
