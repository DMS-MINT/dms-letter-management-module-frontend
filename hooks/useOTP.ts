import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { validateOneTimePassword } from "@/actions/auth/action";

const formSchema = z.object({
	otp: z
		.number()
		.int()
		.refine(
			(value) => {
				const strValue = value.toString();
				return strValue.length === 6 && /^[0-9]+$/.test(strValue);
			},
			{
				message: "OTP must be a 6-digit number.",
			}
		),
});

export type OTPFormType = z.infer<typeof formSchema>;

export function useOTP() {
	const form = useForm<OTPFormType>({
		resolver: zodResolver(formSchema),
	});

	const { mutate, data, isPending, isSuccess } = useMutation({
		mutationKey: ["validateOTP"],
		mutationFn: validateOneTimePassword,
		onMutate: () => {
			toast.dismiss();
			toast.loading("Verifying OTP...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success("OTP verified successfully.");
			return data;
		},
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const getOTP = (): number => form.watch("otp");

	const handleInputChange = (value: string) => {
		form.setValue("otp", Number(value));
	};

	const onSubmit = (values: OTPFormType) => {
		mutate(values.otp);
	};

	return {
		form,
		getOTP,
		handleInputChange,
		onSubmit,
		data,
		isPending,
		isSuccess,
	};
}
