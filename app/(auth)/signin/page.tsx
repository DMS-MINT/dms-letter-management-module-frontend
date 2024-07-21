"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { BrandingSection } from "@/components/features";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/actions/auth/action";
import type { ICredentials } from "@/actions/auth/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default function page() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});
	const { mutate } = useMutation({
		mutationKey: ["signIn"],
		mutationFn: (credentials: ICredentials) => signIn(credentials),
		onMutate: () => {
			toast.dismiss();
			toast.loading("Logging in, please wait...");
		},
		onSuccess: (message: string) => {
			toast.dismiss();
			toast.success(message);
			router.push("/letters/inbox");
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
	}

	return (
		<main className="grid grid-cols-2 h-full">
			<BrandingSection />
			<section className="flex flex-col gap-7 px-24 h-full justify-center">
				<div>
					<h2 className="text-gray-900 font-medium text-xl mt-5 mb-2">
						እንኳን ደህና መጡ!
					</h2>
					<p className="text-gray-700 font-light text-sm">
						እባክዎ ለመግባት የተጠቃሚ መለያዎን እና የይለፍ ቃልዎን ያስገቡ።
					</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>የኢሜይል አድራሻዎን ያስገቡ</FormLabel>
									<FormControl>
										<Input tabIndex={1} {...field} />
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
											<Button type="button" variant="link" className="py-0 h-fit">
												የይለፍ ቃልዎን ረስተዋል?
											</Button>
										</Link>
									</FormLabel>
									<FormControl>
										<div className="relative ">
											<Input
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
												{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
											</Button>
										</div>
									</FormControl>
									<FormMessage className="form-error-message" />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							variant="secondary"
							className="flex gap-2 items-center w-full"
							tabIndex={3}
						>
							<LogIn size={20} />
							ግባ
						</Button>
					</form>
				</Form>

				<div className="flex gap-2 items-center self-center">
					<p className="text-gray-800">የቴክኒክ ድጋፍ ለማግኘት </p>
					<Button variant="link" className="p-0 h-fit text-base">
						እኛን ያነጋግሩን
					</Button>
				</div>
			</section>
		</main>
	);
}
