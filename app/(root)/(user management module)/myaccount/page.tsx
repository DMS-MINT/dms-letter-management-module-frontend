"use client";
import { Drawer, Subheader } from "@/components/layouts";
import MyProfile from "@/components/UserProfile/MyProfile";
import MyProfileSideBar from "@/components/UserProfile/MyProfileSideBar";
import MyProfileTopBar from "@/components/UserProfile/MyProfileTopBar";

export default function MyAccount() {
	return (
		<section className="flex h-full flex-col">
			<Subheader>
				<MyProfileTopBar />
			</Subheader>
			<section className="mt-2 flex flex-1 gap-6 px-5">
				<Drawer>
					<MyProfileSideBar />
				</Drawer>
				<section className="flex-1 pb-5">
					<section className="mb-5 flex flex-1 flex-col items-center bg-gray-100 ">
						<MyProfile />
					</section>
				</section>
			</section>
		</section>
	);
}
