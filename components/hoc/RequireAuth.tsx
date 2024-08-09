"use server";

import { TwoFactorSetupDialog } from "@/components/dialogs";
import SessionExpiredModal from "../dialogs/SessionExpiredModal";

interface Props {
	children: React.ReactNode;
}

export default async function RequireAuth({ children }: Props) {
	return (
		<>
			<SessionExpiredModal />
			<TwoFactorSetupDialog />
			{children}
		</>
	);
}
