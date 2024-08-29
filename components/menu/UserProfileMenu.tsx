"use client";

import { signOut } from "@/actions/auth/action";
import { getMyProfile } from "@/actions/user_module/action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DOCS } from "@/constants";
import { useUserStore } from "@/lib/stores";
import { getInitials } from "@/lib/utils/getInitials";
import type { CurrentUserType } from "@/types/user_module";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FileText, LifeBuoy, LogOut, SquarePlay, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import NotificationPopover from "../drawers/NotificationDrawer";
import { VideoDialog } from "./VideoDialog";

export default function UserProfileMenu() {
	const router = useRouter();
	const [isVideoDialogOpen, setVideoDialogOpen] = useState(false);
	const setCurrentUser = useUserStore((state) => state.setCurrentUser);

	const { isSuccess, data: myProfile } = useQuery({
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
		window.open(DOCS.user_manual, "_blank");
	};
	const handleSupportVideo = () => {
		setVideoDialogOpen(true);
	};

	const closeVideoDialog = () => {
		setVideoDialogOpen(false);
	};

	const fullName = myProfile?.full_name_am;
	const initials = fullName ? getInitials(fullName) : "";

	return isSuccess && myProfile ? (
		<div className="flex items-center gap-4">
			<NotificationPopover />
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="bg-blue-400">
						<AvatarFallback>{initials}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent className="mr-5 min-w-[20rem] max-w-[20rem]">
					<DropdownMenuLabel className="flex flex-col items-start">
						<p>{myProfile.full_name_am}</p>
						<p className="text-sm text-gray-600">{myProfile.job_title.title_am}</p>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => router.push("/myaccount")}>
						<User size={20} className="mr-2" />
						<span>የእኔ መገለጫ</span>
					</DropdownMenuItem>
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<LifeBuoy size={20} className="mr-2" />
							<span>የእገዛ ማዕከል</span>
						</DropdownMenuSubTrigger>
						<DropdownMenuPortal>
							<DropdownMenuSubContent className="mr-2">
								<DropdownMenuItem onClick={() => handleSupport()}>
									<FileText size={20} className="mr-2" />
									<span>የተጠቃሚ መመሪያ</span>
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleSupportVideo()}>
									<SquarePlay size={20} className="mr-2" />
									<span>የቪዲዮ አጋዥ ስልጠና</span>
								</DropdownMenuItem>
							</DropdownMenuSubContent>
						</DropdownMenuPortal>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={() => logOut()} className="flex w-full gap-4">
						<LogOut size={20} />
						<span>ውጣ</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<VideoDialog isOpen={isVideoDialogOpen} onClose={closeVideoDialog} />
		</div>
	) : null;
}
