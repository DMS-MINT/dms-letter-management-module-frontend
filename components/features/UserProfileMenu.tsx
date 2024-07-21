import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signOut } from "@/actions/auth/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getMyProfile } from "@/actions/user_module/action";
import { useAppDispatch } from "@/hooks/hooks";
import { storeMyProfile } from "@/lib/features/user/userSlice";
import { CurrentUserType } from "@/types/user_module";

export default function UserProfileMenu() {
	const router = useRouter();
	const dispatch = useAppDispatch();
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
			toast.loading("Logging out, please wait...");
		},
		onSuccess: () => {
			router.push("/signin");
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});

	return isSuccess && myProfile ? (
		<div className="flex gap-4 items-center">
			<div className="flex items-end gap-2">
				<p className="text-sm">{myProfile.full_name}</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Avatar className="bg-blue-400">
						<AvatarFallback>{myProfile.full_name.substring(0, 2)}</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="flex">
					<DropdownMenuItem onClick={() => logOut()}>ውጣ</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	) : null;
}
