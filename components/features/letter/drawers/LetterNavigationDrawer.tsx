"use client";

import { Badge } from "@/components/ui/badge";
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
import { useAppSelector } from "@/lib/hooks";
import { selectLetters } from "@/lib/features/letter/letterSlice";
import { useEffect, useState } from "react";
import { selectMe } from "@/lib/features/authentication/authSlice";
import { Button } from "@/components/ui/button";
import {
	pendingTableColumns,
	draftTableColumns,
	inboxTableColumns,
	outboxTableColumns,
	publishedTableColumns,
	trashTableColumns,
} from "@/components/features/letter/config";
import { ColumnDef } from "@tanstack/react-table";
import { ILetterListInputSerializer } from "@/typing/interface";

interface LetterNavigationDrawerProps {
	fetchLetters?: (category: string) => void;
	handleColumnConfig?: (config: ColumnDef<ILetterListInputSerializer>[]) => void;
}

type RouteType = {
	name: string;
	icon: JSX.Element;
	showBadge: boolean;
	path: string;
	count: number | null;
	isVisible: boolean;
	category: string;
	columnConfig: ColumnDef<ILetterListInputSerializer>[];
};

const icon_size: number = 20;
const icon_color: string = "#2DA4FF";

export default function LetterNavigationDrawer({
	fetchLetters,
	handleColumnConfig,
}: LetterNavigationDrawerProps) {
	const pathname = usePathname();
	const letters = useAppSelector(selectLetters);
	const me = useAppSelector(selectMe);
	const [routes, setRoutes] = useState<RouteType[]>([]);

	useEffect(() => {
		const primaryRoutes: RouteType[] = [
			{
				name: "ገቢ ደብዳቤዎች",
				icon: <Inbox size={icon_size} color={icon_color} />,
				showBadge: false,
				path: "/letters/inbox",
				count: 10,
				isVisible: true,
				category: "inbox",
				columnConfig: inboxTableColumns,
			},
			{
				name: "የተላኩ ደብዳቤዎች",
				icon: <Send size={icon_size} color={icon_color} />,
				showBadge: false,
				path: "/letters/outbox",
				count: null,
				isVisible: true,
				category: "outbox",
				columnConfig: outboxTableColumns,
			},
			{
				name: "ረቂቆች",
				icon: <FileText size={icon_size} color={icon_color} />,
				showBadge: false,
				path: "/letters/draft",
				count: 3,
				isVisible: true,
				category: "draft",
				columnConfig: draftTableColumns,
			},
			{
				name: "መጣያ",
				icon: <Trash size={icon_size} color={icon_color} />,
				showBadge: false,
				path: "/letters/trash",
				count: 3,
				isVisible: true,
				category: "trash",
				columnConfig: trashTableColumns,
			},
			{
				name: "መጽደቅን በመጠባበቅ ላይ",
				icon: <BookDashed size={icon_size} color={"#FF5733"} />,
				showBadge: false,
				path: "/letters/pending",
				count: null,
				isVisible: me?.is_staff,
				category: "pending",
				columnConfig: pendingTableColumns,
			},
			{
				name: "የታተሙ ደብዳቤዎች",
				icon: <BookCheck size={icon_size} color={"#50C878"} />,
				showBadge: false,
				path: "/letters/published",
				count: null,
				isVisible: me?.is_staff,
				category: "published",
				columnConfig: publishedTableColumns,
			},
		];

		setRoutes(primaryRoutes);
	}, [me]);

	return (
		<nav className="flex flex-col gap-2 w-full">
			{routes
				.filter((route) => route.isVisible === true)
				.map(({ name, icon, showBadge, path, category, columnConfig }) => (
					<Link key={uuidv4()} href={path}>
						<Button
							className={`flex gap-2 text-gray-900 w-full hover:bg-gray-200 justify-start px-2 ${
								path === pathname ? "bg-gray-200" : "bg-transparent"
							}`}
							onClick={() => {
								console.log(category);
							}}
						>
							{icon}
							{name}
							{showBadge ? (
								<Badge
									className="ml-auto hover:bg-gray-200 bg-gray-200"
									variant="secondary"
								>
									{letters.length}
								</Badge>
							) : null}
						</Button>
					</Link>
				))}
		</nav>
	);
}
