"use client";

import Link from "next/link";
import {
	BookDashed,
	FileText,
	Inbox,
	Send,
	BookCheck,
	Trash,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/hooks";
import { selectMyProfile } from "@/lib/features/user/userSlice";

type RouteType = {
	name: string;
	icon: JSX.Element;
	path: string;
	isVisible: boolean;
};

const icon_size: number = 20;
const icon_color: string = "#2DA4FF";

export default function LetterNavigationDrawer() {
	const myProfile = useAppSelector(selectMyProfile);
	const pathname = usePathname();
	const [routes, setRoutes] = useState<RouteType[]>([]);

	useEffect(() => {
		if (myProfile) {
			const primaryRoutes: RouteType[] = [
				{
					name: "ገቢ ደብዳቤዎች",
					icon: <Inbox size={icon_size} color={icon_color} />,
					path: "/letters/inbox",
					isVisible: true,
				},
				{
					name: "የተላኩ ደብዳቤዎች",
					icon: <Send size={icon_size} color={icon_color} />,
					path: "/letters/outbox",
					isVisible: true,
				},
				{
					name: "ረቂቆች",
					icon: <FileText size={icon_size} color={icon_color} />,
					path: "/letters/draft",
					isVisible: true,
				},
				{
					name: "መጣያ",
					icon: <Trash size={icon_size} color={icon_color} />,
					path: "/letters/trash",
					isVisible: true,
				},
				{
					name: "መጽደቅን በመጠባበቅ ላይ",
					icon: <BookDashed size={icon_size} color={"#FF5733"} />,
					path: "/letters/pending",
					isVisible: myProfile.is_staff,
				},
				{
					name: "የታተሙ ደብዳቤዎች",
					icon: <BookCheck size={icon_size} color={"#50C878"} />,
					path: "/letters/published",
					isVisible: myProfile.is_staff,
				},
			];

			setRoutes(primaryRoutes);
		}
	}, [myProfile]);

	return (
		<nav className="flex flex-col gap-2 w-full">
			{routes
				.filter((route) => route.isVisible === true)
				.map(({ name, icon, path }) => (
					<Link key={uuidv4()} href={path}>
						<Button
							className={`flex gap-2 text-gray-900 w-full hover:bg-gray-200 justify-start px-2 ${
								path === pathname ? "bg-gray-200" : "bg-transparent"
							}`}
						>
							{icon}
							{name}
						</Button>
					</Link>
				))}
		</nav>
	);
}
