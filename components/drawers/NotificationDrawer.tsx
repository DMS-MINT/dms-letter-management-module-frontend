import {
	GetNotifications,
	MarkNotificationAsRead,
} from "@/actions/notification/action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { NotificationType2 } from "@/types/shared/NotificationType";
import * as Popover from "@radix-ui/react-popover";
import { useQuery } from "@tanstack/react-query";
import { BellIcon, CalendarIcon, Milestone } from "lucide-react"; // Icons
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function NotificationPopover() {
	const [open, setOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<NotificationType2 | null>(
		null
	);

	const {
		data: notifications = [],
		refetch,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			const data = await GetNotifications();

			// Filter for unread notifications and show toasts
			const unreadNotifications = data.message.filter(
				(notif: NotificationType2) => !notif.has_read
			);

			if (unreadNotifications.length > 0) {
				unreadNotifications.forEach((notif: NotificationType2) =>
					toast(`New notification: ${notif.subject}`, {
						description: notif.sent_at || "No timestamp available",
						action: {
							label: "Mark as read",
							onClick: () => {
								// Implement mark as read functionality
								console.log("Marking as read:", notif.id);
							},
						},
					})
				);
			}

			return data.message as NotificationType2[];
		},
	});

	const handleOpen = async (item: NotificationType2) => {
		setSelectedItem(item);
		setOpen(true);

		// Mark notification as read when opened
		const result = await MarkNotificationAsRead(item.id);
		if (result.ok) {
			refetch(); // Refetch notifications after marking as read
		} else {
			console.error(result.message);
		}
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedItem(null);
	};

	return (
		<>
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button variant="ghost" className="relative">
						<BellIcon className="h-6 w-6" />
						<Badge variant="destructive" className="absolute right-0 top-0">
							{Array.isArray(notifications)
								? notifications.filter((notif) => !notif.has_read).length
								: 0}
						</Badge>
					</Button>
				</Popover.Trigger>
				<Popover.Portal>
					<Popover.Content
						className="w-[380px] rounded-lg border bg-white shadow-lg"
						sideOffset={5}
					>
						<NotificationDrawer
							reminders={
								Array.isArray(notifications)
									? notifications.filter(
											(notif) => notif.details.notification_type === "reminder"
										)
									: []
							}
							notifications={
								Array.isArray(notifications)
									? notifications.filter(
											(notif) => notif.details.notification_type !== "reminder"
										)
									: []
							}
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
									<AvatarFallback>
										{selectedItem?.details.sender.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
								<span>{selectedItem?.details.sender}</span>
							</div>
							<DialogTitle className="mb-3">{selectedItem?.subject}</DialogTitle>
							<DialogDescription>{selectedItem?.message}</DialogDescription>
							<DialogDescription>
								<Badge className="mt-4">
									<CalendarIcon size={16} />
									{selectedItem?.sent_at}
								</Badge>
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button onClick={handleClose}>Close</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</Popover.Root>
		</>
	);
}

function NotificationDrawer({
	reminders,
	notifications,
	onOpen,
}: {
	reminders: NotificationType2[];
	notifications: NotificationType2[];
	onOpen: (item: NotificationType2) => void;
}) {
	return (
		<Tabs defaultValue="reminder" className="min-w-full">
			<TabsList className="w-full">
				<TabsTrigger
					value="reminder"
					className="flex w-full items-start justify-start"
				>
					Reminders
					{reminders.length > 0 && (
						<Badge variant="destructive" className="ml-1">
							{reminders.length}
						</Badge>
					)}
				</TabsTrigger>
				<TabsTrigger
					value="notification"
					className="flex w-full items-start justify-start"
				>
					Notifications
					{notifications.length > 0 && (
						<Badge variant="destructive" className="ml-1">
							{notifications.length}
						</Badge>
					)}
				</TabsTrigger>
			</TabsList>
			<TabsContent value="reminder">
				<NotificationList items={reminders} onOpen={onOpen} />
			</TabsContent>
			<TabsContent value="notification">
				<NotificationList items={notifications} onOpen={onOpen} />
			</TabsContent>
		</Tabs>
	);
}

function NotificationList({
	items,
	onOpen,
}: {
	items: NotificationType2[];
	onOpen: (item: NotificationType2) => void;
}) {
	return (
		<>
			{items.length > 0 ? (
				items.map((item, index) => (
					<div
						key={index}
						className="mb-4 grid cursor-pointer grid-cols-[25px_1fr] items-center rounded-md p-2 last:mb-0 last:pb-0 hover:bg-gray-100"
						onClick={() => onOpen(item)}
					>
						<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
						<div className="flex items-center gap-2">
							<Avatar>
								<AvatarFallback>{item.details.sender.slice(0, 2)}</AvatarFallback>
							</Avatar>
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">{item.subject}</p>
								<p className="text-sm text-muted-foreground">{item.sent_at}</p>
							</div>
						</div>
					</div>
				))
			) : (
				<div className="flex flex-col items-center justify-center">
					<Milestone className="text-gray-400" size={150} />
					<p className="text-sm text-gray-400">No new notifications</p>
				</div>
			)}
		</>
	);
}
