import { validateOneTimePassword } from "@/actions/auth/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	otp: z.string().refine(
		(value) => {
			return value.length === 6 && /^[0-9]+$/.test(value);
		},
		{
			message: "የአንድ ጊዜ የይለፍ ቃል ባለ 6-አሃዝ መሆን አለበት።",
		}
	),
});

export type OTPFormType = z.infer<typeof formSchema>;

export function useOTP() {
	const form = useForm<OTPFormType>({
		resolver: zodResolver(formSchema),
	});

	const { mutate, isPending, isSuccess, data } = useMutation({
		mutationKey: ["validateOneTimePassword"],
		mutationFn: async (otp: string) => {
			const response = await validateOneTimePassword(otp);

			if (!response.ok) throw response;

			return response.message;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("የእርስዎን የማረጋገጫ ኮድ በማረጋገጥ ላይ። እባክዎ ይጠብቁ...");
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("በተሳካ ሁኔታ የሁለት ደረጃ ማረጋገጫን አዘጋጅተዋል።");
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const getOTP = (): string => form.watch("otp");

	const handleInputChange = (value: string) => {
		form.setValue("otp", value);
	};

	const validateOTP = (values: OTPFormType) => {
		mutate(values.otp);
	};

	return {
		form,
		getOTP,
		handleInputChange,
		validateOTP,
		data,
		isPending,
		isSuccess,
	};
}
