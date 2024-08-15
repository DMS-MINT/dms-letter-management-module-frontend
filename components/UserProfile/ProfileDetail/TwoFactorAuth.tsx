"use client";
import { requestQRCode } from "@/actions/auth/action";
import { Spinner } from "@/components/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks";
import { selectMyProfile } from "@/lib/features/user/userSlice";
import { useMutation } from "@tanstack/react-query";
import {
	CheckCircle,
	ChevronDown,
	LockKeyhole,
	LockKeyholeOpen,
} from "lucide-react";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TwoFactorAuth = () => {
	const myProfile = useAppSelector(selectMyProfile);
	const [showPassword, setShowPassword] = useState(false);
	const {
		mutate: requestQRCodeMutate,
		data: qrCodeImage,
		error,
	} = useMutation({
		mutationKey: ["requestQRCode"],
		mutationFn: async () => {
			const response = await requestQRCode();

			if (!response.ok) throw new Error(response.message || "Request failed");

			return response.message.qr_code_image;
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message || "An error occurred");
		},
	});

	useEffect(() => {
		if (myProfile && !myProfile.is_2fa_enabled) {
			requestQRCodeMutate();
		}
	}, [myProfile, requestQRCodeMutate]);

	return (
		<div className="mb-10 space-y-4">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div className=" space-y-2 ">
					<span className="flex items-center gap-2 text-sm text-muted-foreground">
						<LockKeyholeOpen size={18} />
						<p>የሚስጥር ቁጥሮን መቀየር ከፈለጉ ከታች ያለውን ይጫኑ</p>
					</span>
					<Button
						size={"sm"}
						variant={"outline"}
						onClick={() => setShowPassword(!showPassword)}
						className={`flex w-80 justify-between ${showPassword ? "bg-gray-100" : "bg-gray-300"} text-sm text-black `}
					>
						<span className="flex items-center gap-2">
							{showPassword ? (
								<LockKeyholeOpen size={18} />
							) : (
								<LockKeyhole size={18} />
							)}
							የሚስጥር ቁጥር
						</span>
						<ChevronDown size={18} />
					</Button>
					{showPassword && (
						<>
							<div className="space-y-4 rounded-md border-2 border-gray-300 p-4">
								{/* Row 3: Password */}
								<div className="grid grid-cols-1 gap-4 ">
									<div className="col-span-2 space-y-2 md:col-span-1">
										<label className="text-muted-forground block text-sm font-medium">
											አዲስ የሚስጥር ቁጥር - New Password
										</label>
										<Input type="text" className="mt-1 block w-full" />
									</div>
									<div className="col-span-2 space-y-2 md:col-span-1">
										<label className="text-muted-forground block text-sm font-medium">
											በድጋሜ አዲስ የሚስጥር ቁጥር - Confirm Password
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
		</div>
	);
};

export default TwoFactorAuth;
