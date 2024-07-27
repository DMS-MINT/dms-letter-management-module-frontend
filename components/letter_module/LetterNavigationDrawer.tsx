"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks";
import { selectMyProfile } from "@/lib/features/user/userSlice";
import clsx from "clsx";
import { FileText, Inbox, Send, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

type RouteType = {
	name: string;
	icon: React.JSX.Element;
	path: string;
	isVisible: boolean;
};

const ICON_SIZE: number = 20;
const ICON_COLOR: string = "#2DA4FF";

export default function LetterNavigationDrawer() {
	const myProfile = useAppSelector(selectMyProfile);
	const pathname = usePathname();

	const routes: RouteType[] = useMemo(() => {
		if (!myProfile) return [];

		return [
			{
				name: "ገቢ ደብዳቤዎች",
				icon: <Inbox size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/inbox",
				isVisible: true,
			},
			{
				name: "የተላኩ ደብዳቤዎች",
				icon: <Send size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/outbox",
				isVisible: true,
			},
			{
				name: "ረቂቆች",
				icon: <FileText size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/draft",
				isVisible: true,
			},
			{
				name: "መጣያ",
				icon: <Trash size={ICON_SIZE} color={ICON_COLOR} />,
				path: "/letters/trash",
				isVisible: true,
			},
			{
				name: "መጽደቅን በመጠባበቅ ላይ",
				icon: <></>,
				path: "/letters/pending",
				isVisible: myProfile.is_staff,
			},
			{
				name: "የታተሙ ደብዳቤዎች",
				icon: <></>,
				path: "/letters/published",
				isVisible: myProfile.is_staff,
			},
		];
	}, [myProfile]);

	return (
		<nav className="flex w-full flex-col gap-2">
			{routes
				.filter((route) => route.isVisible === true)
				.map(({ name, icon, path }) => (
					<Link key={uuidv4()} href={path}>
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
