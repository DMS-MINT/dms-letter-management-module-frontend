"use server";

import type { NotificationCreateDTO } from "@/types/shared/NotificationType";
import axiosInstance from "../axiosInstance";
import getErrorMessage from "../getErrorMessage";
import { notificationErrorMessages } from "./errorMessages";

// Mark notification as notified
export async function markNotificationAsNotified(notification_id: string) {
	console.log(
		"🚀 ~ markNotificationAsNotified ~ notification_id:",
		notification_id
	);
	try {
		const response = await axiosInstance.put(
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
export async function getNotifications() {
	try {
		const response = await axiosInstance.get("/notifications/");

		return { ok: true, message: response.data.notifications };
	} catch (error: any) {
		return {
			ok: false,
			message: getErrorMessage(notificationErrorMessages, error),
		};
	}
}

// Mark notification as read
export async function markNotificationAsRead(notification_id: string) {
	try {
		const response = await axiosInstance.put(
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

export async function MarkBulkNotificationsAsRead(data: {
	notification_ids: string[];
}) {
	console.log("🚀 ~ markBulkNotificationAsRead ~ notifications:", data);

	// Transform the data to match the expected API format
	const payload = {
		fields: {
			ids: data.notification_ids,
		},
	};
	console.log("🚀 ~ markBulkNotificationAsRead ~ ", payload);
	try {
		const response = await axiosInstance.put(
			"/notifications/bulk/read/",
			payload
		);
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
