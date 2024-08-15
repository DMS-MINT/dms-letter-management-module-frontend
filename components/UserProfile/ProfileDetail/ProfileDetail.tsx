"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, MailCheck, Tag, UserCheck } from "lucide-react";

const ProfileDetail = () => {
	return (
		<div className="mb-10 space-y-4">
			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<UserCheck size={18} />
				<p>ግለመረጃ</p>
			</span>
			<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
				{/* Row 1: First Name, Middle Name, Last Name */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							ስም
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							የአባት ስም
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							የአያት ስም
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
				</div>
				{/* Row 1: First Name, Middle Name, Last Name */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							First Name
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							Middle Name
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="space-y-2">
						<label className="text-muted-forground block text-sm font-medium">
							Last Name
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
				</div>
			</div>

			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<MailCheck size={18} />
				<p>አድራሻ</p>
			</span>
			<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
				{/* Row 2: Email, Phone */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-3 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							ኢሜል - Email
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							ስልክ ቁጥር - Phone Number
						</label>
						<Input type="tel" className="mt-1 block w-full" />
					</div>
				</div>
			</div>
			<span className="flex items-center gap-2 text-sm text-muted-foreground">
				<Tag size={18} />
				<p>መምሪያ</p>
			</span>
			<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
				{/* Row 3: Department Name, Job Title */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							የመምሪያው ስም
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							የስራ መጠሪያ
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
				</div>
				{/* Row 3: Department Name, Job Title */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							Department Name
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
					<div className="col-span-2 space-y-2 md:col-span-1">
						<label className="text-muted-forground block text-sm font-medium">
							Job Title
						</label>
						<Input type="text" className="mt-1 block w-full" />
					</div>
				</div>
			</div>

			<div className="flex justify-end">
				<Button className="flex items-center gap-2">
					<CheckCircle size={18} />
					ለውጡን አስቀምጥ
				</Button>
			</div>
		</div>
	);
};

export default ProfileDetail;
