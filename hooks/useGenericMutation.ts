import { useMutation } from "@tanstack/react-query";

type APIResponseType = {
	ok: boolean;
	message: string;
};

type MutationConfig<T> = {
	mutationKey: string;
	mutationFn: (params: T) => Promise<APIResponseType>;
	onMutate: () => void;
	onSuccess: () => void;
	onError: () => void;
};

export default function useGenericMutation<T>({
	mutationKey,
	mutationFn,
	onMutate,
	onError,
	onSuccess,
}: MutationConfig<T>) {
	const { mutate } = useMutation({
		mutationKey: [mutationKey],
		mutationFn: async (params: T) => {},
	});
	return {};
}
