"use client";

import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores";
import clsx from "clsx";
import { FileText, Inbox, Send, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import * as uuidv4 from "uuid";

type RouteType = {
	id: string;
	name: string;
	icon: React.JSX.Element;
	path: string;
	isVisible: boolean;
};

const ICON_SIZE: number = 20;
const ICON_COLOR: string = "#2DA4FF";

export default function LetterNavigationDrawer() {
	const currentUser = useUserStore((state) => state.currentUser);
	const pathname = usePathname();

	const routes: RouteType[] = useMemo(() => {
		return [
			{
				id: uuidv4.v4(),
				name: "ገቢ ደብዳቤዎች",
				icon: <Inbox size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/inbox",
				isVisible: true,
			},
			{
				id: uuidv4.v4(),
				name: "የተላኩ ደብዳቤዎች",
				icon: <Send size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/outbox",
				isVisible: true,
			},
			{
				id: uuidv4.v4(),
				name: "ረቂቆች",
				icon: <FileText size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/draft",
				isVisible: true,
			},
			{
				id: uuidv4.v4(),
				name: "መጣያ",
				icon: <Trash size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/trash",
				isVisible: true,
			},
			{
				id: uuidv4.v4(),
				name: "መጽደቅን በመጠባበቅ ላይ",
				icon: <></>,
				path: "/letters/pending",
				isVisible: currentUser.is_staff,
			},
			{
				id: uuidv4.v4(),
				name: "የጸደቀ ደብዳቤ",
				icon: <></>,
				path: "/letters/published",
				isVisible: currentUser.is_staff,
			},
		];
	}, [currentUser]);

	return (
		<nav className="flex w-full flex-col gap-2">
			{routes
				.filter((route) => route.isVisible === true)
				.map(({ id, name, icon, path }) => (
					<Link key={id} href={path}>
						<Button
							className={clsx(
								"flex w-full justify-start gap-2 bg-transparent px-2 text-gray-900 hover:bg-gray-200",
								{ "bg-gray-200": path === pathname }
							)}
						>
							{icon}
							{name}
						</Button>
					</Link>
				))}
		</nav>
	);
}
