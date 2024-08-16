"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CurrentUserType } from "@/types/user_module";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, MailCheck, Tag, UserCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const profileSchema = z.object({
	email: z.string().email("Invalid email address"),
	phone_number: z
		.string()
		.regex(
			/^\+2519\d{8}$/,
			"Phone number must start with +2519 and be 13 digits long"
		),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

const ProfileDetail = ({ myProfile }: { myProfile: CurrentUserType }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			email: myProfile?.email || "",
			phone_number: myProfile?.phone_number || "",
		},
	});

	const onSubmit = (data: ProfileFormData) => {
		console.log("Form Data:", data);
		toast.success(`ለውጡን አስቀምጥ ተገናኝቷል ${data.email} , ${data.phone_number}`);
		// Handle form submission logic here
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="mb-10 space-y-4">
			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<UserCheck size={18} />
				<p>ግለመረጃ</p>
				<Badge className="bg-red-400 text-secondary-foreground">የማይለወጥ</Badge>
			</span>
			<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
				{/* Row 1: First Name, Middle Name, Last Name */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							ስም
						</label>
						<Input
							type="text"
							value={myProfile.first_name}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							የአባት ስም
						</label>
						<Input
							type="text"
							value={myProfile.last_name}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							የአያት ስም
						</label>
						<Input
							type="text"
							value={myProfile.last_name}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							First Name
						</label>
						<Input
							type="text"
							value={myProfile.first_name}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							Middle Name
						</label>
						<Input
							type="text"
							value={myProfile.last_name}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							Last Name
						</label>
						<Input
							type="text"
							value={myProfile.last_name}
							disabled={true}
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
			<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
				{/* Row 2: Email, Phone */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-3 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							ኢሜል - Email
						</label>
						<Input type="text" {...register("email")} className="mt-1 block w-full" />
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
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
			<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
				{/* Row 3: Department Name, Job Title */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							የመምሪያው ስም
						</label>
						<Input
							type="text"
							value={myProfile.department.name_am}
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
							value={myProfile.job_title}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							Department Name
						</label>
						<Input
							type="text"
							value={myProfile.department.name_en}
							disabled={true}
							className="mt-1 block w-full"
						/>
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							Job Title
						</label>
						<Input
							type="text"
							value={myProfile.job_title}
							disabled={true}
							className="mt-1 block w-full"
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
