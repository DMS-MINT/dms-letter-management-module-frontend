"use server";

import { get_session } from "@/actions/auth/action";
import { TwoFactorSetupDialog } from "@/components/dialogs";
import { redirect } from "next/navigation";

interface Props {
	children: React.ReactNode;
}

export default async function RequireAuth({ children }: Props) {
	const session = await get_session();

	if (!session) redirect("/signin");

	return (
		<>
			<TwoFactorSetupDialog />
			{children}
		</>
	);
}
