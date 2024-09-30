"use client";

import { forgotPassword } from "@/actions/auth/action";
import { BrandingSection } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
	email: z.string().email({ message: "እባክዎ ትክክለኛ ኢሜል ያስገቡ።" }),
});

export default function ForgotPassword() {
	// Add a state to store the email for later use
	const [email, setEmail] = useState("");
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	const { mutate, isPending } = useMutation({
		mutationKey: ["forgotPassword"],
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			const response = await forgotPassword(values.email);
			if (!response.ok) {
				throw new Error(
					response.message || "Failed to process forgot password request."
				);
			}
			return response;
		},
		onMutate: () => {
			toast.dismiss();
			toast.loading("ኢሜልዎን በማረጋገጥ ላይ፣ እባክዎን ትንሽ ይጠብቁ...");
		},
		onSuccess: (data, values) => {
			toast.dismiss();
			toast.success("የማረጋገጫ ቁጥር ወደ ኢሜይልዎ ተልኳል እባኮትን ኢሜይልዎን ይመልከቱ።");
			setEmail(values.email);
			router.push("forgot-password/verify");
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
		<main className="grid h-full grid-cols-2">
			<BrandingSection />
			<section className="flex h-full flex-col justify-center gap-7 px-24">
				<div>
					<h2 className="mb-2 mt-5 text-xl font-medium text-gray-900">
						የይለፍ ቃልዎን ረስተዋል?
					</h2>
					<p className="text-sm font-light text-gray-700">
						የይለፍ ቃልዎን ደህንነቱ በተጠበቀ ሁኔታ ዳግም ለማስጀመር የተጠቃሚ መለያዎን ከዚህ በታች ያስገቡ።
					</p>
				</div>
				<Form {...form}>
					<form
						className="flex flex-col gap-5"
						onSubmit={form.handleSubmit(onSubmit)}
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
						<Button
							variant="secondary"
							className="w-full"
							type="submit"
							disabled={isPending}
						>
							ቀጥል
						</Button>
					</form>
				</Form>
				<div className="flex items-center justify-between">
					<Link href="/signin">
						<Button variant="outline" className="flex items-center gap-2">
							<ChevronLeft size={20} />
							ተመለስ
						</Button>
					</Link>
					<Button variant="link" className="h-fit p-0 text-base">
						የተጠቃሚ መታወቂያዎን ማስታወስ አይችሉም?
					</Button>
				</div>
			</section>
		</main>
	);
}
