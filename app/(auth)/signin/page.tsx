"use client";

import type { ICredentials } from "@/actions/auth/action";
import { signIn } from "@/actions/auth/action";
import { BrandingSection } from "@/components/helpers";
import { LetterSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
	password: z.string().min(1, { message: "እባክዎ የይለፍ ቃልዎን ያስገቡ።" }),
	remember: z.boolean().default(false).optional(),
});

export default function SignIn() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const router = useRouter();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			remember: false,
		},
	});

	const { mutate, isSuccess, isPending } = useMutation({
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
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values as ICredentials);
	}

	return !isSuccess ? (
		<main className="grid h-full grid-cols-2">
			<BrandingSection />
			<section className="flex h-full flex-col justify-center gap-7 px-24">
				<div>
					<h2 className="mb-2 mt-5 text-xl font-medium text-gray-900">
						እንኳን ደህና መጡ!
					</h2>
					<p className="text-sm font-light text-gray-700">
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
										{/* <Link href="/forgot-password" tabIndex={4}>
											<Button type="button" variant="link" className="h-fit py-0">
												የይለፍ ቃልዎን ረስተዋል?
											</Button>
										</Link> */}
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
						{/* <FormField
							control={form.control}
							name="remember"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="flex items-center gap-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												className=" h-5 w-5 "
											/>
										</FormControl>
										አስታውሰኝ
									</FormLabel>
									<FormMessage className="form-error-message" />
								</FormItem>
							)}
						/> */}

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

				<div className="flex items-center gap-2 self-center">
					<p className="text-gray-800">የቴክኒክ ድጋፍ ለማግኘት </p>
					<Button variant="link" className="h-fit p-0 text-base">
						እኛን ያነጋግሩን
					</Button>
				</div>
			</section>
		</main>
	) : (
		<LetterSkeleton />
	);
}
