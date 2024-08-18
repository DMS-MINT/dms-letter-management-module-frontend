"use server";

import type { NotificationCreateDTO } from "@/types/shared/NotificationType";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { notificationErrorMessages } from "./errorMessages";

// Mark notification as notified
export async function MarkNotificationAsNotified(notification_id: string) {
	try {
		const response = await axiosInstance.post(
			`/notifications/${notification_id}/notified/`
		);
		return { ok: true, message: response.data };
	} catch (error: any) {
		return {
			ok: false,
			message: getErrorMessage(notificationErrorMessages, error),
		};
	}
}

// Get all notifications
export async function GetNotifications() {
	try {
		const response = await axiosInstance.get("/notifications/");
		return { ok: true, message: response.data };
	} catch (error: any) {
		return {
			ok: false,
			message: getErrorMessage(notificationErrorMessages, error),
		};
	}
}

// Mark notification as read
export async function MarkNotificationAsRead(notification_id: string) {
	try {
		const response = await axiosInstance.post(
			`/notifications/${notification_id}/read/`
		);
		return { ok: true, message: response.data };
	} catch (error: any) {
		return {
			ok: false,
			message: getErrorMessage(notificationErrorMessages, error),
		};
	}
}

// Mark multiple notifications as read (bulk)
export async function MarkBulkNotificationsAsRead(data: {
	notification_ids: string[];
}) {
	try {
		const response = await axiosInstance.post("/notifications/bulk/read/", data);
		return { ok: true, message: response.data };
	} catch (error: any) {
		return {
			ok: false,
			message: getErrorMessage(notificationErrorMessages, error),
		};
	}
}

export async function sendReminderNotification(
	params: [NotificationCreateDTO]
) {
	try {
		const [data] = params;
		await axiosInstance.post("/notifications/reminder/", data);

		return { ok: true, message: "የማስታወሻ መልእክቱ በተሳካ ሁኔታ ተልኳል።" };
	} catch (error: any) {
		return {
			ok: false,
			message: getErrorMessage(notificationErrorMessages, error),
		};
	}
}
