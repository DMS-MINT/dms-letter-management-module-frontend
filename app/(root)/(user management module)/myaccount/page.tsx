import MyProfile from "@/components/UserProfile/MyProfile";
import MyProfileTopBar from "@/components/UserProfile/MyProfileTopBar";

export default function MyAccount() {
	return (
		<div>
			<div className="flex w-full flex-col bg-secondary">
				<MyProfileTopBar />
				<MyProfile />
			</div>
		</div>
	);
}
