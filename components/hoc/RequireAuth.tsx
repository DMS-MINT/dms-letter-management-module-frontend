"use server";

import { TwoFactorSetupDialog } from "../dialogs";

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
