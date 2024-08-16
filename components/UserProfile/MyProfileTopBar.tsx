"use client";
import { getMyProfile } from "@/actions/user_module/action";
import { useUserStore } from "@/lib/stores";
import type { CurrentUserType } from "@/types/user_module";
import { useQuery } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

const MyProfileTopBar = () => {
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

	return isSuccess && myProfile ? (
		<div>
			<div className="mx-10 flex h-14 items-center justify-between">
				<div className="flex items-center gap-2">
					<h1 className="text-xl font-bold">{myProfile.full_name_am}</h1>
					<span>
						<Badge className="flex items-center justify-start bg-green-100 text-green-500">
							{" "}
							<Dot />
							መስመር ላይ
						</Badge>
					</span>
				</div>
				<h2>ግለ መረጃ</h2>
			</div>
		</div>
	) : null;
};

export default MyProfileTopBar;
