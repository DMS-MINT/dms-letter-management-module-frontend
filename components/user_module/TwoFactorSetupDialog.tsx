"use client";

import { requestQRCode, validateOneTimePassword } from "@/actions/auth/action";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { selectMyProfile } from "@/lib/features/user/userSlice";
import { useAppSelector } from "@/hooks";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Spinner } from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Button } from "../ui/button";
import { LINKS } from "@/constants";

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
				message: "የአንድ ጊዜ የይለፍ ቃል ባለ 6-አሃዝ መሆን አለበት።",
			}
		),
});

export default function TwoFactorSetupDialog() {
	const myProfile = useAppSelector(selectMyProfile);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: requestQRCodeMutate, data: qrCodeImage } = useMutation({
		mutationKey: ["requestQRCode"],
		mutationFn: () => requestQRCode(),
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const { mutate: validateOTPMutate, isPending } = useMutation({
		mutationKey: ["validateOneTimePassword"],
		mutationFn: (otp: number) => validateOneTimePassword(otp),
		onMutate: () => {
			toast.dismiss();
			toast.loading("የእርስዎን የማረጋገጫ ኮድ በማረጋገጥ ላይ። እባክዎ ይጠብቁ...");
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("በተሳካ ሁኔታ የሁለት ደረጃ ማረጋገጫን አዘጋጅተዋል።");
			setIsDialogOpen(false);
		},
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	useEffect(() => {
		if (!myProfile) return;

		if (!myProfile.is_2fa_enabled) {
			setIsDialogOpen(true);
			requestQRCodeMutate();
		}
	}, [myProfile]);

	const oneTimePassword = form.watch("otp");

	const handleInputChange = (value: string) => {
		form.setValue("otp", Number(value));
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		validateOTPMutate(values.otp);
	}

	return (
		<section>
			<Dialog open={isDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>የሁለት ደረጃ ማረጋገጫን አዘጋጅ</DialogTitle>
						<DialogDescription>
							የQR ኮድን ለመቃኘት የ
							<Link
								href={LINKS.google_authenticator}
								className="text-blue-800"
								target="_blank"
							>
								{" Google Authenticator "}
							</Link>
							ይጠቀሙ።
						</DialogDescription>
					</DialogHeader>
					<div className="flex justify-center">
						{qrCodeImage ? (
							<img
								src={`data:image/png;base64,${qrCodeImage}`}
								alt="QR code for two-factor authentication setup"
								className="bg-white w-60"
							/>
						) : (
							<div className="w-60 aspect-square flex justify-center items-center">
								<Spinner />
							</div>
						)}
					</div>
					<div>
						<p className="text-center text-sm">
							በማረጋገጫ መተግበሪያዎ የተፈጠረውን ባለ 6-አሃዝ የማረጋገጫ ኮድ ያስገቡ፡
						</p>
						<Form {...form}>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									form.handleSubmit(onSubmit);
								}}
							>
								<FormField
									control={form.control}
									name="otp"
									render={() => (
										<FormItem>
											<FormLabel></FormLabel>
											<FormControl>
												<InputOTP maxLength={6} onChange={handleInputChange}>
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
					</div>
					<DialogFooter>
						<Button
							disabled={
								!oneTimePassword || oneTimePassword.toString().length !== 6 || isPending
							}
							type="submit"
							onClick={form.handleSubmit(onSubmit)}
						>
							ቀጥል
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</section>
	);
}
