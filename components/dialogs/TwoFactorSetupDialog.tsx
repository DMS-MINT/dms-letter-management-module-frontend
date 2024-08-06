"use client";

import {
	requestQRCode,
	signOut,
	validateOneTimePassword,
} from "@/actions/auth/action";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
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
import { LINKS } from "@/constants";
import { useAppSelector } from "@/hooks";
import { selectMyProfile } from "@/lib/features/user/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Spinner } from "../helpers";
import { Button } from "../ui/button";

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
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: requestQRCodeMutate, data: qrCodeImage } = useMutation({
		mutationKey: ["requestQRCode"],
		mutationFn: async () => {
			const response = await requestQRCode();

			if (!response.ok) throw response;

			return response.message.qr_code_image;
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const { mutate: validateOTPMutate, isPending } = useMutation({
		mutationKey: ["validateOneTimePassword"],
		mutationFn: async (otp: number) => {
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
			setIsDialogOpen(false);
		},
		onError: (error: any) => {
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
	}, [myProfile, requestQRCodeMutate]);

	const oneTimePassword = form.watch("otp");

	const handleInputChange = (value: string) => {
		form.setValue("otp", Number(value));
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		validateOTPMutate(values.otp);
	}

	const { mutate: logOut } = useMutation({
		mutationKey: ["signOut"],
		mutationFn: signOut,
		onMutate: () => {
			toast.dismiss();
			toast.loading("እርስዎን በማስወጣት ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: () => {
			router.push("/signin");
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});

	return (
		<section>
			<Dialog open={isDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>የሁለት ደረጃ ማረጋገጫን አዘጋጅ</DialogTitle>
						<DialogDescription>
							የQR ኮድን ለመቃኘት የ
							<Link
								className="text-blue-800"
								href={LINKS.google_authenticator}
								target="_blank"
							>
								{" Google Authenticator "}
							</Link>
							ይጠቀሙ።
						</DialogDescription>
					</DialogHeader>
					<div className="flex justify-center">
						{qrCodeImage ? (
							<Image
								className="bg-white"
								src={`data:image/png;base64,${qrCodeImage}`}
								alt="QR code for two-factor authentication setup"
								width={240}
								height={240}
							/>
						) : (
							<div className="flex aspect-square w-60 items-center justify-center">
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
						<Button variant={"outline"} onClick={() => logOut()}>
							ከመተበሪያው ውጣ
						</Button>
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
