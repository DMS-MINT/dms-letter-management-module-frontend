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
import { LINKS } from "@/constants";
import { getDefaultSignature } from "@/actions/signature_module/action";
import { useEffect } from "react";

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

	const {
		mutate: getDefaultSignatureMutate,
		data: e_signature,
		isPending,
	} = useMutation({
		mutationKey: ["getDefaultSignature"],
		mutationFn: (otp: number) => getDefaultSignature(otp),
		onMutate: () => {
			toast.dismiss();
			toast.loading("የእርስዎን የማረጋገጫ ኮድ በማረጋገጥ ላይ። እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			return data.e_signature;
		},
		onError: (error) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	useEffect(() => {
		console.log(e_signature);
	}, [e_signature]);

	const oneTimePassword = form.watch("otp");

	const handleInputChange = (value: string) => {
		form.setValue("otp", Number(value));
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		getDefaultSignatureMutate(values.otp);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					onClick={() => {
						form.reset();
					}}
				>
					ወደ መዝገብ ቢሮ አስተላልፍ
				</Button>
			</DialogTrigger>
			<DialogContent className="">
				<DialogHeader className="gap-2">
					<DialogTitle>ማንነቶን ያረጋግጡ</DialogTitle>
					<DialogDescription>
						በ
						<Link
							href={LINKS.google_authenticator}
							className="text-blue-800"
							target="_blank"
						>
							{" Google Authenticator "}
						</Link>
						መተግበሪያዎ ላይ ያለውን ባለ 6-አሃዝ የማረጋገጫ ኮድ ያስገቡ።
					</DialogDescription>
					{e_signature ? (
						<div className="flex justify-center h-60">
							<img
								src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${e_signature}`}
								alt="Signature"
							/>
						</div>
					) : null}
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
				</DialogHeader>
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
	);
}
