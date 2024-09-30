"use client";
import {
	requestQRCode,
	resetPassword,
	setEmail,
	signIn,
	type ICredentials,
} from "@/actions/auth/action";
import { getMyProfile } from "@/actions/user_module/action";
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
import type { CurrentUserType } from "@/types/user_module";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
	CheckCircle,
	ChevronDown,
	Eye,
	EyeOff,
	LockKeyhole,
	LockKeyholeOpen,
	LogIn,
} from "lucide-react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
	password: z.string().min(1, { message: "እባክዎ የይለፍ ቃልዎን ያስገቡ።" }),
});

const TwoFactorAuth = ({ logedUser }: { logedUser: CurrentUserType }) => {
	const [showPasswordDialog, setShowPasswordDialog] = useState(false);
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [authenticated, setAuthenticated] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
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
			toast.loading("ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success(data.message);
			setAuthenticated(true);
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.email !== logedUser?.email)
			return toast.error("እባክዎን የራሶን ኢሜል ያስገቡ።");
		mutate(values as ICredentials);
	}
	const setCurrentUser = useUserStore((state) => state.setCurrentUser);
	const { data: myProfile } = useQuery({
		queryKey: ["getMyProfile"],
		queryFn: async () => {
			try {
				const data = await getMyProfile();
				setCurrentUser(data.my_profile);
				return data.my_profile as CurrentUserType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: true,
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

	useEffect(() => {
		if (!myProfile) return;

		requestQRCodeMutate();
	}, [myProfile, requestQRCodeMutate]);

	const router = useRouter();
	const { mutate: resetPasswordMutate } = useMutation({
		mutationKey: ["resetPassword"],
		mutationFn: async () => {
			setEmail(logedUser.email);
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
		if (!logedUser?.email) {
			return toast.error("Email not found.");
		}
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
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>የኢሜይል አድራሻዎን ያስገቡ</FormLabel>
											<FormControl>
												<Input readOnly={isPending} tabIndex={1} {...field} />
											</FormControl>
											<FormMessage className="form-error-message" />
										</FormItem>
									)}
								/>
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
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div className=" space-y-2 ">
								<span className="flex items-center gap-2 text-sm text-muted-foreground">
									<LockKeyholeOpen size={18} />
									<p>የሚስጥር ቁጥሮን መቀየር ከፈለጉ ከታች ያለውን ይጫኑ</p>
								</span>
								<Button
									size={"sm"}
									variant={"outline"}
									onClick={() => setShowPasswordDialog(!showPasswordDialog)}
									className={`flex w-80 justify-between ${showPasswordDialog ? "bg-gray-100" : "bg-gray-300"} text-sm text-black `}
								>
									<span className="flex items-center gap-2">
										{showPasswordDialog ? (
											<LockKeyholeOpen size={18} />
										) : (
											<LockKeyhole size={18} />
										)}
										የሚስጥር ቁጥር
									</span>
									<ChevronDown size={18} />
								</Button>
								{showPasswordDialog && (
									<>
										<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
											{/* Row 3: Password */}
											<div className="grid grid-cols-1 gap-4 ">
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
											</div>
										</div>
										<div className="flex justify-end">
											<Button
												disabled={newPassword !== confirmPassword}
												className="flex items-center gap-2"
												onClick={handleSubmit}
											>
												<CheckCircle size={18} />
												ለውጡን አስቀምጥ
											</Button>
										</div>
									</>
								)}
							</div>
							<div className=" flex flex-col items-center justify-center  space-y-2">
								<span className="flex items-center gap-2 text-sm text-muted-foreground">
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
