"use client";

import { signOut } from "@/actions/auth/action";
import { getMyProfile } from "@/actions/user_module/action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/hooks";
import { storeMyProfile } from "@/lib/features/user/userSlice";
import type { CurrentUserType } from "@/types/user_module";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CircleHelp, LogOut, MonitorPlay } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { VideoDialog } from "./VideoDialog";

export default function UserProfileMenu() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [isVideoDialogOpen, setVideoDialogOpen] = useState(false);

	const { isSuccess, data: myProfile } = useQuery({
		queryKey: ["getMyProfile"],
		queryFn: async () => {
			try {
				const data = await getMyProfile();
				dispatch(storeMyProfile(data.my_profile));
				return data.my_profile as CurrentUserType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: true,
	});

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

	const handleSupport = () => {
		// Open the PDF file located in the public folder
		window.open("/Training.pdf", "_blank");
	};
	const handleSupportVideo = () => {
		setVideoDialogOpen(true);
	};

	const closeVideoDialog = () => {
		setVideoDialogOpen(false);
	};

	return isSuccess && myProfile ? (
		<div className="flex items-center gap-4">
			{/* <div className="flex items-end gap-2">
				<p className="text-sm">{myProfile.full_name}</p>
			</div> */}
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="bg-blue-400">
						<AvatarFallback>{myProfile.full_name.substring(0, 2)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex transform flex-col rounded-lg border border-gray-300 bg-white p-2 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
					<DropdownMenuItem
						onClick={() => logOut()}
						className="flex items-center gap-3 rounded-md bg-gray-300 px-4 py-3 text-white transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-blue-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M10 17l5 5 5-5H10z"></path>
							<path d="M5 12H2V2h20v10h-3"></path>
						</svg>
						<span className="font-medium">ውጣ</span>
					</DropdownMenuItem>
				<DropdownMenuContent className="mr-2 flex flex-col">
					<DropdownMenuItem className="flex w-full gap-3">
						<div className="flex flex-col items-center ">
							<p className="text-sm">{myProfile.full_name}</p>
							<span className="text-xs text-muted-foreground">
								{myProfile.department}
							</span>
						</div>
					</DropdownMenuItem>
					<Separator className="mb-1 h-1" />

					<DropdownMenuItem
						onClick={() => handleSupport()}
						className="flex w-full gap-4"
					>
						<CircleHelp size={20} />
						እርዳታ
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() => handleSupportVideo()}
						className="flex w-full gap-4"
					>
						<MonitorPlay size={20} />
						የቪዲዮ እርዳታ
					</DropdownMenuItem>
					<Separator />
					<DropdownMenuItem onClick={() => logOut()} className="flex w-full gap-4">
						<LogOut size={20} />
						ውጣ
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<VideoDialog isOpen={isVideoDialogOpen} onClose={closeVideoDialog} />
		</div>
	) : null;
}
