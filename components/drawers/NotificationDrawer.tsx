import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { BellIcon, CheckIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";
import { CalendarIcon, Milestone } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Define the interface for notification items
interface NotificationItem {
	sendBy: string;
	title: string;
	description: string;
	date: string;
}

const reminders: NotificationItem[] = [
	{
		sendBy: "ጌታቸው",
		title: "የእርስዎ ጥሪ ተረጋግጧል።",
		date: "1 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ዮሐንስ",
		title: "አዲስ መልእክት አለዎት!",
		date: "1 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ኪዳነ",
		title: "የእርስዎ እቃ በቅር ይጠናቀቃል!",
		date: "2 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "አበበ",
		title: "የእርስዎ እቃ በቅር ይጠናቀቃል!",
		date: "2 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ቤን",
		title: "የእርስዎ እቃ በቅር ይጠናቀቃል!",
		date: "2 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
];

const notifications: NotificationItem[] = [
	{
		sendBy: "ጽዮን",
		title: "የእርስዎ ጥሪ ተረጋግጧል።",
		date: "1 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ተርካ",
		title: "አዲስ መልእክት አለዎት!",
		date: "1 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ከበደ",
		title: "የእርስዎ እቃ በቅር ይጠናቀቃል!",
		date: "2 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ካላብ",
		title: "የእርስዎ እቃ በቅር ይጠናቀቃል!",
		date: "2 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
	{
		sendBy: "ቤን",
		title: "የእርስዎ እቃ በቅር ይጠናቀቃል!",
		date: "2 ሰዓት በፊት",
		description: "ይህ የተነግሯል፣ ለአንድ ጥቅም የሚደርስበትን ትምህርት እና የሚሆን ጥራት እንደሆን ሁኔታ አለ።",
	},
];

export default function NotificationPopover() {
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<NotificationItem | null>(
		null
	);

	const handleOpen = (item: NotificationItem) => {
		setSelectedItem(item);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedItem(null);
	};

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<Button variant="ghost" className="relative">
					<BellIcon className="z-0 h-6 w-6" />
					<Badge variant="destructive" className="absolute right-0 top-0 z-30">
						4
					</Badge>
				</Button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className="w-[380px] rounded-lg border bg-white shadow-lg"
					sideOffset={5}
				>
					<NotificationDrawer
						reminders={reminders}
						notifications={notifications}
						onOpen={handleOpen}
					/>
					<Popover.Arrow className="fill-white" />
				</Popover.Content>
			</Popover.Portal>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarFallback>{selectedItem?.sendBy.slice(0, 2)}</AvatarFallback>
							</Avatar>
							<span>{selectedItem?.sendBy}</span>
						</div>
						<DialogTitle className="mb-3 flex flex-col items-center justify-center">
							{selectedItem?.title}
						</DialogTitle>
						<DialogDescription>{selectedItem?.description}</DialogDescription>
						<DialogDescription>
							<Badge className="mt-4 flex w-fit items-center gap-2">
								<CalendarIcon size={16} />
								{selectedItem?.date}
							</Badge>
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button onClick={handleClose}>ዝጋ</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</Popover.Root>
	);
}

type CardProps = React.ComponentProps<typeof Card>;

function NotificationDrawer({
	reminders,
	notifications,
	onOpen,
}: {
	reminders: NotificationItem[];
	notifications: NotificationItem[];
	onOpen: (item: NotificationItem) => void;
}) {
	return (
		<Card className="w-full">
			<Tabs defaultValue="reminder" className="min-w-full">
				<TabsList className="w-full">
					<TabsTrigger
						value="reminder"
						className="flex w-full items-start justify-start"
					>
						ማሳወቂያዎች
						<Badge variant="destructive" className="ml-1">
							{reminders.length}
						</Badge>
					</TabsTrigger>
					<TabsTrigger
						value="notification"
						className="flex w-full items-start justify-start"
					>
						መልእክቶች
						<Badge variant="destructive" className="ml-1">
							{notifications.length}
						</Badge>
					</TabsTrigger>
				</TabsList>
				<TabsContent value="reminder">
					<CardDescription className="my-2 text-center text-green-500">
						ያልተነበቡ {reminders.length} ማሳወቂያዎች አሉህ
					</CardDescription>

					<CardContent className="grid h-[20rem] gap-4 overflow-auto pt-4">
						<div>
							{reminders.length > 0 ? (
								reminders.map((item, index) => (
									<div
										key={index}
										className="mb-4 grid cursor-pointer grid-cols-[25px_1fr] items-center rounded-md p-2 last:mb-0 last:pb-0 hover:bg-gray-100"
										onClick={() => onOpen(item)}
									>
										<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
										<div className="flex items-center gap-2">
											<Avatar>
												<AvatarFallback>{item.sendBy.slice(0, 2)}</AvatarFallback>
											</Avatar>
											<div className="space-y-1">
												<p className="text-sm font-medium leading-none">{item.title}</p>
												<p className="text-sm text-muted-foreground">{item.date}</p>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="flex flex-col items-center justify-center">
									<Milestone className="text-gray-400" size={150} />
									<p className="text-sm text-gray-400">ምንም አዲስ ማሳወቂያ የሉም</p>
								</div>
							)}
						</div>
					</CardContent>
					<CardFooter>
						{reminders.length > 4 && (
							<Button className="w-full">
								<CheckIcon className="mr-2 h-4 w-4" />
								ሁሉንም እንደተነበቡ ማሳወቂያ አድርግ
							</Button>
						)}
					</CardFooter>
				</TabsContent>
				<TabsContent value="notification">
					<CardDescription className="my-2 text-center text-green-500">
						ያልተነበቡ {notifications.length} መልእክቶች አሉህ
					</CardDescription>

					<CardContent className="grid h-[20rem] gap-4 overflow-auto pt-4">
						<div>
							{notifications.length > 0 ? (
								notifications.map((item, index) => (
									<div
										key={index}
										className="mb-4 grid cursor-pointer grid-cols-[25px_1fr] items-center rounded-md p-2 last:mb-0 last:pb-0 hover:bg-gray-100"
										onClick={() => onOpen(item)}
									>
										<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
										<div className="flex items-center gap-2">
											<Avatar>
												<AvatarFallback>{item.sendBy.slice(0, 2)}</AvatarFallback>
											</Avatar>
											<div className="space-y-1">
												<p className="text-sm font-medium leading-none">{item.title}</p>
												<p className="text-sm text-muted-foreground">{item.date}</p>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="flex flex-col items-center justify-center">
									<Milestone className="text-gray-400" size={150} />
									<p className="text-sm text-gray-400">ምንም አዲስ መልእክት የሉም</p>
								</div>
							)}
						</div>
					</CardContent>
					<CardFooter>
						{notifications.length > 4 && (
							<Button className="w-full">
								<CheckIcon className="mr-2 h-4 w-4" />
								ሁሉንም እንደተነበቡ መልእክት አድርግ
							</Button>
						)}
					</CardFooter>
				</TabsContent>
			</Tabs>
		</Card>
	);
}
