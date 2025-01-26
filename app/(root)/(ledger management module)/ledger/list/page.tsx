"use client";
import { getMyProfile } from "@/actions/user_module/action";
import { LedgerScreen } from "@/components/screen/ledger/LedgerScreen";
import { useUserStore } from "@/lib/stores";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { CurrentUserType } from "@/types/user_module";
import { useState } from "react";

type Props = {};

const Page = (props: Props) => {
	const currentUserPermission = useUserStore(
		(state) => state.currentUser.users_permissions
	);
	const [permission, setPermission] = useState(false);
	const {
		isSuccess,
		data: myProfile,
		isError,
	} = useQuery({
		queryKey: ["getMyProfile"],
		queryFn: async () => {
			try {
				const data = await getMyProfile();
				setPermission(data.users_permissions.is_staff);
				console.log("the user profile", data.users_permissions);
				return data.my_profile as CurrentUserType;
			} catch (error: any) {
				toast.error(error.message);
			}
		},
		enabled: true,
	});

	// Conditional rendering based on query success and error states
	if (isError) {
		return <div>Error</div>;
	}

	if (isSuccess) {
		return (
			<main className="flex-1 overflow-y-auto rounded-lg bg-background p-4 shadow-lg">
				<div>
					<LedgerScreen permission={permission} />
				</div>
			</main>
		);
	}

	// Optional: You can add a loading state if needed
	return <div>Loading...</div>;
};

export default Page;
