"use server";

import { TwoFactorSetupDialog } from "@/components/dialogs";

interface Props {
	children: React.ReactNode;
}

export default async function RequireAuth({ children }: Props) {
	return (
		<>
			<TwoFactorSetupDialog />
			{children}
		</>
	);
}
