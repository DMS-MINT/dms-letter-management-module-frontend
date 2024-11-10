"use client";
import {
	requestQRCode,
	resetPassword,
	setEmail,
	signIn,
	type ICredentials,
} from "@/actions/auth/action";
import { Spinner } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
	CheckCircle,
	Eye,
	EyeOff,
	LockKeyhole,
	LockKeyholeOpen,
	LogIn,
} from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
	password: z.string().min(1, { message: "እባክዎ የይለፍ ቃልዎን ያስገቡ።" }),
});

const TwoFactorAuth = () => {
	const router = useRouter();
	const currentUser = useUserStore((state) => state.currentUser);
	const [showPasswordDialog, setShowPasswordDialog] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: currentUser.email,
			password: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["signIn"],
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			const response = await signIn(values);

			if (!response.ok) throw response;

			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success(data.message);
			setAuthenticated(true);
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error("የተሳሳተ የይለፍ ቃል አስገብተዋል። እባክዎ እንደገና ይሞክሩ።");
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values as ICredentials);
	}

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

	useEffect(() => {
		if (!currentUser) return;

		requestQRCodeMutate();
	}, [currentUser, requestQRCodeMutate]);

	const { mutate: resetPasswordMutate } = useMutation({
		mutationKey: ["resetPassword"],
		mutationFn: async () => {
			setEmail(currentUser.email);
			const response = await resetPassword(newPassword, confirmPassword);

			if (!response.ok) throw new Error("Failed to reset password.");

			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("የይለፍ ቃል በመቀየር ላይ እባኮትን ይጠብቁ...");
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
		onSuccess: () => {
			toast.dismiss();
			toast.success("የይለፍ ቃልዎ በሚገባ ተቀይሯል እባኮትን በቀየሩት የይለፍ ቃል ይግቡ፡፡");
			router.push("/signin");
		},
	});

	const handleSubmit = () => {
		resetPasswordMutate();
	};

	return (
		<div className="my-10 space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="text-center text-base">
						{authenticated
							? "የሚስጥር ቁጥር መቀየሪያ ገጽ"
							: "ይህንን አገልግሎት ለማከናወን በቅድሚያ የይለፍ ቃሎን ያስገቡ።"}
					</CardTitle>
				</CardHeader>
				{!authenticated ? (
					<CardContent className="mb-20 flex flex-col items-center justify-center gap-4">
						<LockKeyhole size={100} />
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="w-[30rem] space-y-5"
							>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="flex justify-between">
												የይለፍ ቃልዎን ያስገቡ
											</FormLabel>
											<FormControl>
												<div className="relative ">
													<Input
														readOnly={isPending}
														type={showPassword ? "text" : "password"}
														tabIndex={2}
														{...field}
													/>
													<Button
														type="button"
														size={"icon"}
														variant={"ghost"}
														className="absolute right-1 top-0 hover:bg-transparent"
														onClick={() => setShowPassword(!showPassword)}
													>
														{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
													</Button>
												</div>
											</FormControl>
											<FormMessage className="form-error-message" />
										</FormItem>
									)}
								/>

								<Button
									disabled={isPending}
									type="submit"
									variant="secondary"
									className="flex w-full items-center gap-2"
									tabIndex={3}
								>
									<LogIn size={20} />
									አስገባ
								</Button>
							</form>
						</Form>
					</CardContent>
				) : (
					<CardContent className="mb-20 ">
						<div className="flex">
							<div className="flex-1">
								<span className="flex items-center gap-2 text-sm text-muted-foreground">
									<LockKeyholeOpen size={18} />
									<p>የሚስጥር ቁጥሮን መቀየር ከፈለጉ ከታች ያለውን ይጫኑ</p>
								</span>
								<div className="mt-5 space-y-4">
									{/* Row 3: Password */}
									<div className="col-span-2 space-y-2 md:col-span-1">
										<label className="text-muted-forground block text-sm font-medium">
											አዲስ የሚስጥር ቁጥር - New Password
										</label>
										<Input
											type="text"
											className="mt-1 block w-full"
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
										/>
									</div>
									<div className="col-span-2 space-y-2 md:col-span-1">
										<label className="text-muted-forground block text-sm font-medium">
											በድጋሚ አዲስ የሚስጥር ቁጥር - Confirm Password
										</label>
										<Input
											type="text"
											className="mt-1 block w-full"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
										/>
									</div>
									<Button
										disabled={newPassword !== confirmPassword}
										className="flex items-center gap-2"
										onClick={handleSubmit}
									>
										<CheckCircle size={18} />
										ለውጡን አስቀምጥ
									</Button>
								</div>
							</div>
							<div className="flex-1">
								<span className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
									<LockKeyholeOpen size={18} />
									<p>የሚስጥር ቁጥሮን መቀየር ከፈለጉ ከታች ያለውን ይጫኑ</p>
								</span>

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
							</div>
						</div>
					</CardContent>
				)}
			</Card>
		</div>
	);
};

export default TwoFactorAuth;
