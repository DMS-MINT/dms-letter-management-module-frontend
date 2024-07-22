"use server";

import { get_session } from "@/actions/auth/action";
import { redirect } from "next/navigation";
import { TwoFactorSetupDialog } from "../user_module";

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
