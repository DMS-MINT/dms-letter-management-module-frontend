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
				setCurrentUser(data.member);
				return data.my_profile as CurrentUserType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: true,
	});

	return isSuccess && myProfile ? (
		<section className="flex w-full items-center justify-between">
			<span className="flex items-center gap-2">
				<h1 className="text-xl font-bold">{myProfile.member_profile.full_name_am}</h1>

				<Badge className="flex items-center justify-start bg-green-100 text-green-500">
					{" "}
					<Dot />
					መስመር ላይ
				</Badge>
			</span>

			<h2>ግለ መረጃ</h2>
		</section>
	) : null;
};

export default MyProfileTopBar;
