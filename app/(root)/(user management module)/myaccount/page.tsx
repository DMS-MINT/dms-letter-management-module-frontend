"use client";
import { getMyProfile } from "@/actions/user_module/action";
import { Drawer, Subheader } from "@/components/layouts";
import MyProfile from "@/components/UserProfile/MyProfile";
import MyProfileSideBar from "@/components/UserProfile/MyProfileSideBar";
import MyProfileTopBar from "@/components/UserProfile/MyProfileTopBar";
import { useUserStore } from "@/lib/stores";
import type { CurrentUserType } from "@/types/user_module";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function MyAccount() {
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
		<section className="flex h-full flex-col">
			<Subheader>
				<MyProfileTopBar />
			</Subheader>
			<section className="mt-2 flex flex-1 gap-6 px-5">
				<Drawer>
					<MyProfileSideBar myProfile={myProfile} />
				</Drawer>
				<section className="flex-1 pb-5">
					<section className="mb-5 flex flex-1 flex-col items-center bg-gray-100 ">
						<MyProfile />
					</section>
				</section>
			</section>
		</section>
	) : null;
}
