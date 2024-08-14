"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Adjust the import path
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"; // Adjust the import path
import { useState } from "react";
// Adjust the import path
import type { ICredentials } from "@/actions/auth/action";
import { signIn, signOut } from "@/actions/auth/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Assuming you are using react-hook-form
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
	password: z.string().min(1, { message: "እባክዎ የይለፍ ቃልዎን ያስገቡ።" }),
});
const SessionExpiredModal = () => {
	const [open, setOpen] = useState(false);
	// delete the above code and use this
	// const { isSessionExpired, setSessionExpired } = useSession();
	// add the useSession hook to the top of the file

	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();
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
			toast.loading("ኢሜልዎን እና የይለፍ ቃልዎን በማረጋገጥ ላይ፣ እባክዎ ይጠብቁ...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success(data.message);
			router.push("/letters/inbox");
			setOpen(false);
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});
	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values as ICredentials);
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
		<div>
			{/* open={isSessionExpired} onOpenChange={() => setSessionExpired(false)} */}
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>የቆይታ ክፍለ ጊዜዎ አልፎበታል።</AlertDialogTitle>
						<AlertDialogDescription>
							ለመቀጠል የሚጠቅሙበትን ኢሜል እና የይለፍ ቃል ያስገቡ።
						</AlertDialogDescription>
					</AlertDialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
											<Link href="/forgot-password" tabIndex={4}>
												<Button type="button" variant="link" className="h-fit py-0">
													የይለፍ ቃልዎን ረስተዋል?
												</Button>
											</Link>
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
								ግባ
							</Button>
						</form>
					</Form>

					<AlertDialogFooter>
						<AlertDialogAction onClick={() => logOut()} className="flex gap-4">
							<LogOut size={20} />
							ውጣ
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default SessionExpiredModal;
