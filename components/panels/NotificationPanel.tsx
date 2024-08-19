"use client";

import {
	getNotifications,
	markNotificationAsNotified,
} from "@/actions/notification/action";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/utils/getInitials";
import type { NotificationDetailType } from "@/types/shared/NotificationType";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function NotificationPanel() {
	const { mutate } = useMutation({
		mutationKey: ["mark"],
		mutationFn: markNotificationAsNotified,
	});
	useQuery({
		queryKey: ["notifications"],
		queryFn: async () => {
			try {
				const response = await getNotifications();
				if (!response.ok) throw response;
				const notifications = response.message
					.notifications as NotificationDetailType[];

				notifications
					.filter((notification) => !notification.has_notified)
					// .filter((notification) => !notification.has_read)
					.forEach(({ id, subject, message, details, tags }) => {
						toast.custom(
							(t) => (
								<div
									className={`${
										t.visible ? "animate-enter" : "animate-leave"
									} pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
								>
									<div className="w-0 flex-1 p-4">
										<div className="flex items-start">
											<div className="flex-shrink-0 pt-0.5">
												<Avatar>
													<AvatarFallback className="bg-blue-200 text-sm">
														{getInitials(details?.sender?.full_name || "ሎረ")}
													</AvatarFallback>
												</Avatar>
											</div>
											<div className="ml-3 flex-1">
												<p className="text-sm font-medium text-gray-900">{subject}</p>
												<p className="mt-1 text-sm text-gray-500">{message}</p>
												<div className="mt-2 flex gap-2">
													{tags.map((tag) => (
														<Badge key={tag}>{tag}</Badge>
													))}
												</div>
											</div>
										</div>
									</div>
									<div className="flex border-l border-gray-200">
										<button
											onClick={() => {
												toast.dismiss(t.id);
												mutate(id);
											}}
											className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
										>
											ዝጋ
										</button>
									</div>
								</div>
							),
							{ duration: Infinity }
						);
					});

				return response.message as NotificationDetailType[];
			} catch (error: any) {
				toast.dismiss();
				toast.error(error.message);
				return null;
			}
		},
	});

	return <Toaster position="bottom-right" />;
}
