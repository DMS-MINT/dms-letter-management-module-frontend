"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores";
import clsx from "clsx";
import {
	CheckCheck,
	FileText,
	FolderDown,
	Inbox,
	Loader,
	Send,
	Trash,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import * as uuidv4 from "uuid";

type RouteType = {
	id: string;
	name: string;
	icon: React.JSX.Element;
	path: string;
};

const ICON_SIZE: number = 20;
const ICON_COLOR: string = "#2DA4FF";

export default function LetterNavigationDrawer() {
	const currentUser = useUserStore((state) => state.currentUser);
	const pathname = usePathname();
	const router = useRouter();

	const staffRoutes: RouteType[] = [
		{
			id: uuidv4.v4(),
			name: "በመጠባበቅ ላይ",
			icon: <Loader size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/letters/pending",
		},
		{
			id: uuidv4.v4(),
			name: "ወጪ የተደረጉ ደብዳቤዎች",
			icon: <CheckCheck size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/letters/published",
		},
		{
			id: uuidv4.v4(),
			name: "የመዝገብ ደብዳቤዎች",
			icon: <FolderDown size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/ledger/list",
		},
	];

	const routes: RouteType[] = [
		{
			id: uuidv4.v4(),
			name: "ገቢ ደብዳቤዎች",
			icon: <Inbox size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/letters/inbox",
		},
		{
			id: uuidv4.v4(),
			name: "የተላኩ ደብዳቤዎች",
			icon: <Send size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/letters/outbox",
		},
		{
			id: uuidv4.v4(),
			name: "ረቂቆች",
			icon: <FileText size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/letters/draft",
		},
		{
			id: uuidv4.v4(),
			name: "የመዝገብ ደብዳቤዎች",
			icon: <FolderDown size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/ledger/list",
		},
		{
			id: uuidv4.v4(),
			name: "መጣያ",
			icon: <Trash size={ICON_SIZE} color={ICON_COLOR} />,
			path: "/letters/trash",
		},
	];

	return (
		<nav className="flex h-full w-full flex-col justify-between gap-2">
			{currentUser.users_permissions.is_staff ? (
				<div>
					{staffRoutes.map(({ id, name, icon, path }) => (
						<Button
							key={id}
							onClick={() => router.push(path)}
							className={clsx(
								"flex w-full justify-start gap-2 bg-transparent px-2 text-gray-900 hover:bg-gray-200",
								{ "bg-gray-200": path === pathname }
							)}
						>
							{icon}
							{name}
						</Button>
					))}
				</div>
			) : null}

			<div>
				{routes.map(({ id, name, icon, path }) => (
					<Button
						key={id}
						onClick={() => router.push(path)}
						className={clsx(
							"flex w-full justify-start gap-2 bg-transparent px-2 text-gray-900 hover:bg-gray-200",
							{ "bg-gray-200": path === pathname }
						)}
					>
						{icon}
						{name}
					</Button>
				))}
			</div>
		</nav>
	);
}
