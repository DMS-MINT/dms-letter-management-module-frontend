"use client";

import { requestQRCode, signOut } from "@/actions/auth/action";
import { getMyProfile } from "@/actions/user_module/action";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LINKS } from "@/constants";
import { useOTP } from "@/hooks";
import { useUserStore } from "@/lib/stores";
import type { CurrentUserType } from "@/types/user_module";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { OTPInputForm } from "../forms";
import { Spinner } from "../helpers";
import { Button } from "../ui/button";

export default function TwoFactorSetupDialog() {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { form, validateOTP, handleInputChange, isPending, getOTP, isSuccess } =
		useOTP();
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

	useEffect(() => {
		if (isSuccess) {
			setIsDialogOpen(false);
		}
	}, [isSuccess]);

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

		if (!myProfile.is_2fa_enabled) {
			setIsDialogOpen(true);
			requestQRCodeMutate();
		}
	}, [myProfile, requestQRCodeMutate]);

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
		<AlertDialog open={isDialogOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>የሁለት ደረጃ ማረጋገጫን አዘጋጅ</AlertDialogTitle>
					<AlertDialogDescription>
						የQR ኮድን ለመቃኘት የ
						<Link
							className="text-blue-800"
							href={LINKS.google_authenticator}
							target="_blank"
						>
							{" Google Authenticator "}
						</Link>
						ይጠቀሙ።
					</AlertDialogDescription>
				</AlertDialogHeader>
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
				<div>
					<p className="text-center text-sm">
						በማረጋገጫ መተግበሪያዎ የተፈጠረውን ባለ 6-አሃዝ የማረጋገጫ ኮድ ያስገቡ፡
					</p>
					<OTPInputForm showLabel={false} form={form} onChange={handleInputChange} />
				</div>
				<AlertDialogFooter>
					<Button variant={"outline"} onClick={() => logOut()} className="mr-auto">
						<LogOut size={20} />
						ዘግተህ ውጣ
					</Button>
					<Button
						disabled={!getOTP() || getOTP().length !== 6 || isPending}
						type="submit"
						onClick={form.handleSubmit(validateOTP)}
					>
						ቀጥል
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
