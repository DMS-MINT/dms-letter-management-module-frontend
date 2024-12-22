"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UserCheck, CheckCircle, MailCheck, Tag } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CurrentUserType } from "@/types/user_module";
import { updateProfile } from "@/actions/user_module/action";
import { useMutation } from "@tanstack/react-query";

const profileSchema = z.object({
	email: z.string().email("Invalid email address"),
	first_name_en: z.string().optional(),
	middle_name_en: z.string().optional(),
	last_name_en: z.string().optional(),
	first_name_am: z.string().optional(),
	middle_name_am: z.string().optional(),
	last_name_am: z.string().optional(),
	phone_number: z.string().refine(
		(val) => /^2519\d{8}$/.test(val), // digits starting with 2519 and must be 12 digits
		"Phone number must start with 2519 and be 12 digits long"
	),

	use_email: z.boolean(),
	use_sms: z.boolean(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
const ProfileDetail = ({ myProfile }: { myProfile: CurrentUserType }) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			email: myProfile?.email,
			first_name_en: myProfile?.user_profile.first_name_en,
			middle_name_en: myProfile?.user_profile.middle_name_en,
			last_name_en: myProfile?.user_profile.last_name_en,
			first_name_am: myProfile?.user_profile.first_name_am,
			middle_name_am: myProfile?.user_profile.middle_name_am,
			last_name_am: myProfile?.user_profile.last_name_am,
			phone_number: myProfile?.user_profile.phone_number?.toString(),
			use_email: myProfile?.user_preferences.use_email,
			use_sms: myProfile?.user_preferences.use_sms,
		},
	});

	const mutation = useMutation({
		mutationFn: async (payload: ProfileFormData) => {
			const response = await updateProfile(payload);
			if (!response.ok) {
				throw new Error("Failed to update profile");
			}
			return response;
		},
		onSuccess: (data) => {
			toast.success("Profile updated successfully!");
			console.log("Update successful:", data);
		},
		onError: (error: any) => {
			toast.error(`Error: ${error.message || "Something went wrong!"}`);
		},
		onSettled: () => {
			toast.dismiss();
		},
	});

	// Handle form submission
	const onSubmit = (data: ProfileFormData) => {
		toast.loading("Submitting your data...");
		mutation.mutate(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mb-10 space-y-4">
			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<UserCheck size={18} />
				<p>ግለመረጃ</p>
				<Badge>የሚለወጥ</Badge>
			</span>
			<div className="space-y-4 rounded-md border-2 p-4">
				{/* First Name, Middle Name, Last Name (Amharic) */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="block text-sm font-medium text-muted-foreground">
							ስም
						</label>
						<Input
							type="text"
							{...register("first_name_am")}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="block text-sm font-medium text-muted-foreground">
							የአባት ስም
						</label>
						<Input
							type="text"
							{...register("middle_name_am")}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="block text-sm font-medium text-muted-foreground">
							የአያት ስም
						</label>
						<Input
							type="text"
							{...register("last_name_am")}
							className="mt-1 block w-full"
						/>
					</div>
				</div>
				{/* First Name, Middle Name, Last Name (English) */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							First Name
						</label>
						<Input
							type="text"
							{...register("first_name_en")}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="block text-sm font-medium text-muted-foreground">
							Middle Name
						</label>
						<Input
							type="text"
							{...register("middle_name_en")}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="block text-sm font-medium text-muted-foreground">
							Last Name
						</label>
						<Input
							type="text"
							{...register("last_name_en")}
							className="mt-1 block w-full"
						/>
					</div>
				</div>
			</div>

			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<MailCheck size={18} />
				<p>አድራሻ</p>
				<Badge>የሚለወጥ</Badge>
			</span>
			<div className="space-y-4 rounded-md border-2 p-4">
				{/* Email and Phone */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-3 space-y-2 md:col-span-1">
						<label className="block text-sm font-medium text-muted-foreground">
							ኢሜል - Email
						</label>
						<Input type="text" {...register("email")} className="mt-1 block w-full" />
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="block text-sm font-medium text-muted-foreground">
							ስልክ ቁጥር - Phone Number
						</label>
						<Input
							type="tel"
							{...register("phone_number")}
							className="mt-1 block w-full"
						/>
						{errors.phone_number && (
							<p className="text-sm text-red-500">{errors.phone_number.message}</p>
						)}
					</div>
				</div>
			</div>

			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<Tag size={18} />
				<p>መምሪያ</p>
				<Badge className="bg-red-400 text-secondary-foreground">የማይለወጥ</Badge>
			</span>
			<div className="space-y-4 rounded-md border-2  p-4">
				{/* Row 3: Department Name, Job Title */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							የመምሪያው ስም
						</label>
						<Input
							type="text"
							value={myProfile.user_profile.department.department_name_am}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							የስራ መጠሪያ
						</label>
						<Input
							type="text"
							value={myProfile.user_profile.job_title.title_am}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="block text-sm font-medium text-muted-foreground">
							Department Name
						</label>
						<Input
							type="text"
							value={myProfile.user_profile.department.department_name_en}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="block text-sm font-medium text-muted-foreground">
							Job Title
						</label>
						<Input
							type="text"
							value={myProfile.user_profile.job_title.title_en}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
				</div>
			</div>

			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<Tag size={18} />
				<p>የተጠቃሚ ምርጫ</p>
				<Badge>የሚለወጥ</Badge>
			</span>
			<div className="space-y-4 rounded-md border-2  p-4">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="block text-sm font-medium text-muted-foreground">
							ኢሜል ማስተካከያ - Email Setting
						</label>
						<Controller
							name="use_email"
							control={control}
							render={({ field }) => (
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							)}
						/>
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="block text-sm font-medium text-muted-foreground">
							ኤስኤምኤስ ማስተካከያ - SMS Setting
						</label>
						<Controller
							name="use_sms"
							control={control}
							render={({ field }) => (
								<Switch checked={field.value} onCheckedChange={field.onChange} />
							)}
						/>
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<Button type="submit" className="flex items-center gap-2">
					<CheckCircle size={18} />
					ለውጡን አስቀምጥ
				</Button>
			</div>
		</form>
	);
};

export default ProfileDetail;
