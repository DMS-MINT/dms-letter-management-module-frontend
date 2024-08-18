export type NotificationCreateDTO = {
	to: string[];
	message: string;
	channels: ("in-app" | "email" | "sms")[];
	details: {
		source: "user";
	} & Record<string, unknown>;
};
//channels: enum('email', 'sms', 'in-app')

export type NotificationType2 = {
	id: string; // Unique identifier for the notification
	subject: string; // Subject of the notification
	message: string; // Body of the notification
	details: {
		notification_type: string; // Type of notification
		sender: string; // Sender of the notification
	}; // Additional details as a string
	sent_at: string; // ISO 8601 date-time string representing when the notification was sent
	tags: string[]; // Array of tags associated with the notification
	has_read: boolean; // Boolean indicating if the notification has been read
	has_notified: boolean; // Boolean indicating if the notification has been sent
};
