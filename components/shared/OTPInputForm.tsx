"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { memo } from "react";
import { UseFormReturn } from "react-hook-form";

type OTPInputFormProps = {
	form: UseFormReturn<
		{
			otp: number;
		},
		any,
		undefined
	>;
	onChange: (_value: string) => void;
};

function OTPInputForm({ form, onChange }: OTPInputFormProps) {
	return (
		<Form {...form}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<FormField
					control={form.control}
					name="otp"
					render={() => (
						<FormItem>
							<FormLabel>የአንድ ጊዜ የይለፍ ቃልዎን ያስገቡ</FormLabel>
							<FormControl>
								<InputOTP maxLength={6} onChange={onChange}>
									<InputOTPGroup className="w-full">
										{Array.from({ length: 6 }).map((_, index) => (
											<InputOTPSlot key={index} index={index} className="flex-1" />
										))}
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage className="form-error-message" />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

export default memo(OTPInputForm);
