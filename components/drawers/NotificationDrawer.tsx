import {
	getNotifications,
	MarkBulkNotificationsAsRead,
	markNotificationAsRead,
} from "@/actions/notification/action";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { getInitials } from "@/lib/utils/getInitials";
import type { NotificationDetailType } from "@/types/shared/NotificationType";
import { BellIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function NotificationPopover() {
	const {
		data: notifications = [],
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["notificationsList"],
		queryFn: async () => {
			try {
				const response = await getNotifications();
				if (!response.ok) throw response;
				return response.message as NotificationDetailType[];
			} catch (error: any) {
				console.error("Error fetching notifications:", error);
				throw new Error("Failed to fetch notifications.");
			}
		},
	});

	// const unreadCount = notifications.filter((notif) => !notif.has_read).length;
	// Ensure notifications is always an array
	const validNotifications = notifications || [];

	const unreadCount = validNotifications.filter(
		(notif) => !notif.has_read
	).length;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative">
					<BellIcon className="z-0 h-6 w-6" />
					{unreadCount > 0 && (
						<Badge variant="destructive" className="absolute right-0 top-0 z-30">
							{unreadCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[380px] rounded-lg border bg-white shadow-lg"
				sideOffset={5}
			>
				{isLoading ? (
					<CardContent className="text-center">Loading...</CardContent>
				) : isError ? (
					<CardContent className="text-center text-red-500">
						Failed to load notifications.
					</CardContent>
				) : (
					<NotificationDrawer notifications={notifications} />
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function NotificationDrawer({
	notifications,
}: {
	notifications: NotificationDetailType[];
}) {
	// Ensure that the notifications array is valid and filter out any undefined or null values
	const validNotifications = notifications.filter((notif) => notif);

	// Separate system and user notifications
	const systemNotifications = validNotifications.filter(
		(notif) => notif.details?.source === "system"
	);
	const userNotifications = validNotifications.filter(
		(notif) => notif.details?.source === "user"
	);
	// Sorting system notifications by `sent_at` (most recent first)
	const sortedSystemNotifications = systemNotifications.sort(
		(a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
	);

	// Sorting user notifications by `sent_at` (most recent first)
	const sortedUserNotifications = userNotifications.sort(
		(a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
	);

	const queryClient = useQueryClient();
	const { mutate: mutateAsRead } = useMutation({
		mutationKey: ["markasRead"],
		mutationFn: markNotificationAsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notificationsList"] });
		},
	});

	const { mutate: mutateAsBulk } = useMutation({
		mutationKey: ["markasReadBulk"],
		mutationFn: MarkBulkNotificationsAsRead,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["notificationsList"] });
		},
	});

	const handleMarkAsRead = (id: string) => {
		mutateAsRead(id);
	};

	const handleBulkMarkasRead = (notification_ids: string[]) => {
		mutateAsBulk({ notification_ids });
	};

	return (
		<Card className="w-full">
			<Tabs defaultValue="reminder" className="min-w-full">
				<TabsList className="w-full">
					<TabsTrigger
						value="reminder"
						className="flex w-full items-start justify-start"
					>
						ከመተግበሪያው የተላኩ
						<Badge variant="destructive" className="ml-1">
							{systemNotifications?.filter((n) => !n.has_read).length}
						</Badge>
					</TabsTrigger>
					<TabsTrigger
						value="notification"
						className="flex w-full items-start justify-start"
					>
						የከተጠቃሚ የተላኩ
						<Badge variant="destructive" className="ml-1">
							{userNotifications?.filter((n) => !n.has_read).length}
						</Badge>
					</TabsTrigger>
				</TabsList>

				{/* System Notifications */}
				<TabsContent value="reminder">
					<CardDescription className="my-2 text-center text-sky-500">
						ያልተነበቡ {systemNotifications?.filter((n) => !n.has_read).length} ማሳወቂያዎች
						አሉህ
					</CardDescription>

					<Separator />
					<CardContent className="hide-scrollbar grid h-[20rem] gap-4 overflow-auto px-0 pt-4">
						<Accordion type="single" collapsible>
							{sortedSystemNotifications?.map((item, index) => (
								<AccordionItem value={item.id} key={index}>
									<AccordionTrigger
										className={`px-4 font-normal hover:bg-muted ${
											item.has_read ? "" : "bg-sky-50"
										} hover:no-underline`}
										onClick={() => handleMarkAsRead(item.id)}
									>
										<div className="flex w-full justify-between">
											<span className="flex items-center justify-center gap-2">
												{!item.has_read && (
													<span className="flex h-2 w-2 rounded-full bg-sky-500" />
												)}
												<span>{item.subject}</span>
											</span>
											<Badge variant={"destructive"} className="text-sm tracking-tighter">
												{" "}
												{formatDistanceToNow(new Date(item.sent_at), { addSuffix: true })}
											</Badge>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-4">
										<div>
											<div className="mb-2 flex flex-shrink-0 items-center gap-4 pt-0.5">
												<Avatar>
													<AvatarFallback className="bg-blue-200 text-sm">
														{getInitials(item.details?.sender?.full_name || "ሎረ")}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col items-start justify-center gap-0 leading-4">
													<span className="font-semibold ">
														{item.details.sender.full_name}
													</span>
													<span className="text-gray-400">
														{item.details.sender.job_title}
													</span>
												</div>
											</div>
											<Separator />
											<p className="mt-1">{item.message}</p>

											<div className="mt-2 flex gap-2">
												{item.tags.map((tag) => (
													<Badge key={tag}>{tag}</Badge>
												))}
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
					<CardFooter className="px-2">
						<Button
							className="w-full"
							onClick={() =>
								handleBulkMarkasRead(systemNotifications.map((n) => n.id))
							}
						>
							<CheckCheck className="mr-2 h-4 w-4" />
							ሁሉንም እንደተነበቡ አድርግ
						</Button>
					</CardFooter>
				</TabsContent>

				{/* User Notifications */}
				<TabsContent value="notification">
					<CardDescription className="my-2 text-center text-sky-500">
						ያልተነበቡ {userNotifications?.filter((n) => !n.has_read).length} መልእክቶች አሉህ
					</CardDescription>

					<Separator />
					<CardContent className="hide-scrollbar grid h-[20rem] gap-4 overflow-auto px-0 pt-4">
						<Accordion type="single" collapsible>
							{sortedUserNotifications?.map((item, index) => (
								<AccordionItem value={item.id} key={index}>
									<AccordionTrigger
										className={`px-4 py-2 font-normal hover:bg-muted ${
											item.has_read ? "" : "bg-sky-50"
										} hover:no-underline`}
										onClick={() => handleMarkAsRead(item.id)}
									>
										<div className="flex w-full flex-col items-end justify-between">
											<span className="flex items-center justify-center gap-2">
												{!item.has_read && (
													<span className="flex h-2 w-3 rounded-full bg-sky-500" />
												)}
												<span className="line-clamp-2 text-start text-sm leading-4">
													{item.subject}
												</span>
											</span>
											<Badge className="text-sm tracking-tighter">
												{formatDistanceToNow(new Date(item.sent_at), { addSuffix: true })}
											</Badge>
										</div>
									</AccordionTrigger>
									<AccordionContent className="px-4">
										<div>
											<div className="mb-2 flex flex-shrink-0 items-center gap-4 pt-0.5">
												<Avatar>
													<AvatarFallback className="bg-blue-200 text-sm">
														{getInitials(item.details?.sender?.full_name || "ሎረ")}
													</AvatarFallback>
												</Avatar>
												<div className="flex flex-col items-start justify-center gap-0 leading-4">
													<span className="font-semibold ">
														{item.details.sender.full_name}
													</span>
													<span className="text-gray-400">
														{item.details.sender.job_title}
													</span>
												</div>
											</div>
											<Separator />
											<p className="mt-1">{item.message}</p>

											<div className="mt-2 flex gap-2">
												{item.tags.map((tag) => (
													<Badge key={tag}>{tag}</Badge>
												))}
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</CardContent>
					<CardFooter className="px-2">
						<Button
							className="w-full"
							onClick={() => handleBulkMarkasRead(userNotifications?.map((n) => n.id))}
						>
							<CheckCheck className="mr-2 h-4 w-4" />
							ሁሉንም እንደተነበቡ አድርግ
						</Button>
					</CardFooter>
				</TabsContent>
			</Tabs>
		</Card>
	);
}
