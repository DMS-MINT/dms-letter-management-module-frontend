export type NotificationCreateDTO = {
	to: string[];
	message: string;
	channels: ("in-app" | "email" | "sms")[];
	details: {
		source: "user";
	} & Record<string, unknown>;
};

export type NotificationDetailType = {
	id: string;
	subject: string;
	message: string;
	details: {
		source: "user" | "system";
		letter_ref: string;
		sender: {
			full_name: string;
			job_title: string;
		};
	} & Record<string, unknown>;
	sent_at: string;
	tags: string[];
	has_read: boolean;
	has_notified: boolean;
};
