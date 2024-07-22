"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
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
import Link from "next/link";
import { requestQRCode, validateOneTimePassword } from "@/actions/auth/action";

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

export default function SubmitLetter() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: requestQRCodeMutate, data: qrCodeImage } = useMutation({
		mutationKey: ["requestQRCode"],
		mutationFn: () => requestQRCode(),
		onError: (error) => {
			console.log(error);
		},
	});

	const { mutate: validateOTPMutate, data: e_signature } = useMutation({
		mutationKey: ["validateOneTimePassword"],
		mutationFn: (otp: number) => validateOneTimePassword(otp),
		onMutate: () => {
			toast.dismiss();
			toast.loading("የእርስዎን የማረጋገጫ ኮድ በማረጋገጥ ላይ። እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			console.log(data);
		},
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	const oneTimePassword = form.watch("otp");

	const handleInputChange = (value: string) => {
		form.setValue("otp", Number(value));
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		validateOTPMutate(values.otp);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					onClick={() => {
						form.reset();
						requestQRCodeMutate();
					}}
				>
					ወደ መዝገብ ቢሮ አስተላልፍ
				</Button>
			</DialogTrigger>
			<DialogContent className="">
				<DialogHeader className="gap-2">
					<DialogTitle>ማንነቶን ያረጋግጡ</DialogTitle>
					<DialogDescription>
						ይህንን ሂደት ለማጠናቀቅ{" "}
						<Link
							href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=web_share"
							className="text-blue-800"
							target="_blank"
						>
							two-factor authentication
						</Link>{" "}
						መተግበሪያ ያስፈልግዎታል እና ይህን የQR ኮድ በመተግበሪያዎ ይቃኙ።
					</DialogDescription>
					{e_signature ? (
						<div className="flex justify-center h-60">
							<img
								src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${e_signature}`}
								alt="Signature"
							/>
						</div>
					) : (
						<div className="flex justify-center">
							{qrCodeImage ? (
								<img
									src={`data:image/png;base64,${qrCodeImage}`}
									alt="QR code"
									className="bg-white w-60"
								/>
							) : (
								<div className="w-60 aspect-square flex justify-center items-center">
									<p>በመጫን ላይ...</p>
								</div>
							)}
						</div>
					)}
					<div className="">
						<p className="text-center text-sm">
							በማረጋገጫ መተግበሪያዎ የተፈጠረውን ባለ 6-አሃዝ የማረጋገጫ ኮድ ያስገቡ፡
						</p>
						<Form {...form}>
							<form>
								<FormField
									control={form.control}
									name="otp"
									render={() => (
										<FormItem>
											<FormLabel></FormLabel>
											<FormControl>
												<InputOTP maxLength={6} onChange={handleInputChange}>
													<InputOTPGroup className="w-full">
														<InputOTPSlot index={0} className="flex-1" />
														<InputOTPSlot index={1} className="flex-1" />
														<InputOTPSlot index={2} className="flex-1" />
														<InputOTPSlot index={3} className="flex-1" />
														<InputOTPSlot index={4} className="flex-1" />
														<InputOTPSlot index={5} className="flex-1" />
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
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button className="bg-white text-black hover:bg-white">አይ</Button>
					</DialogClose>
					<Button
						disabled={!oneTimePassword || oneTimePassword.toString().length !== 6}
						type="submit"
						onClick={form.handleSubmit(onSubmit)}
					>
						አዎ
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
