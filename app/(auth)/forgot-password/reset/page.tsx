"use client";

import { resetPassword } from "@/actions/auth/action";
import { BrandingSection } from "@/components/helpers";
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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
	.object({
		nPassword: z.string().min(8, { message: "እባክዎ የይለፍ ቃልዎን ያስገቡ።" }),
		comPassword: z.string().min(8, { message: "እባክዎ የይለፍ ቃልዎን ደግመው ያስገቡ።" }),
	})
	.superRefine((values, ctx) => {
		if (values.comPassword !== values.nPassword) {
			ctx.addIssue({
				path: ["comPassword"],
				code: z.ZodIssueCode.custom,
				message: "የይለፍ ቃሎቹ እኩል መሆን አለበት።",
			});
		}
	});

export default function Reset() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nPassword: "",
			comPassword: "",
		},
	});
	const router = useRouter();
	const { mutate, isPending } = useMutation({
		mutationKey: ["resetPassword"],
		mutationFn: async (values: z.infer<typeof formSchema>) => {
			const response = await resetPassword(values.nPassword, values.comPassword);

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
	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
	}

	return (
		<main className="grid h-full grid-cols-2">
			<BrandingSection />
			<section className="flex flex-col justify-center gap-7 px-24">
				<div>
					<h2 className="mb-2 mt-5 text-xl font-medium text-gray-900">
						የይለፍ ቃሎን ይቀይሩ።
					</h2>
					<p className="text-sm font-light text-gray-700">
						እባክዎ የይለፍ ቃልዎ ጠንካራ እና ደህንነቱ የተጠበቀ መሆኑን ያረጋግጡ።
					</p>
				</div>
				<Form {...form}>
					<form
						className="flex flex-col gap-5"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FormField
							control={form.control}
							name="nPassword"
							render={({ field }) => (
								<FormItem>
									<div className="grid items-center gap-1.5">
										<FormLabel>አዲስ የይለፍ ቃል ያስገቡ</FormLabel>
										<FormControl>
											<Input {...field} tabIndex={1} readOnly={isPending} />
										</FormControl>
										<FormMessage className="form-error-message" />
										<div className="my-3 ml-5">
											<ul className="list-disc text-sm font-light text-gray-700">
												<li> የይለፍ ቃልህ ከሌላ የግል መረጃህ ጋር በጣም ተመሳሳይ ሊሆን አይችልም።</li>
												<li> የይለፍ ቃልዎ ቢያንስ 8 ቁምፊዎችን መያዝ አለበት።</li>
												<li> የይለፍ ቃልዎ ቢያንስ አንድ አቢይ ሆሄ መያዝ አለበት።</li>
												<li> የይለፍ ቃልዎ ቢያንስ አንድ የቁጥር እሴት መያዝ አለበት።</li>
												<li> የይለፍ ቃልዎ ቢያንስ አንድ ልዩ ቁምፊ (@, #,$,%) መያዝ አለበት።</li>
											</ul>
										</div>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="comPassword"
							render={({ field }) => (
								<FormItem>
									<div className="grid items-center gap-1.5">
										<FormLabel>አዲሱን የይለፍ ቃልዎን ያረጋግጡ</FormLabel>
										<FormControl>
											<Input tabIndex={2} readOnly={isPending} {...field} />
										</FormControl>
									</div>
								</FormItem>
							)}
						/>

						<Button variant="default" className="w-full" type="submit">
							ጨርስ
						</Button>
					</form>
				</Form>
			</section>
		</main>
	);
}
