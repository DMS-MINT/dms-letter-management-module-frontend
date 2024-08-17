"use client";

import { SendReminderNotification } from "@/actions/notification/action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

export type NotificationType = {
	to: string[];
	message: string;
	channels: string[];
	details: Record<string, unknown>;
};

const NotificationSchema = z.object({
	recipients: z.array(z.string()).min(1, "At least one recipient is required."),
	message: z.string().min(1, "Message cannot be empty."),
	channels: z.array(z.string()).min(1, "At least one channel must be selected."),
});

interface PingNotificationModalProps {
	open: boolean;
	onClose: () => void;
	letterRef: string;
}

const notificationChannels = [
	{ id: "email", label: "በኢሜል ማሳወቂያ" },
	{ id: "sms", label: "በእጅ ሞባይል ሚሴጅ ማሳወቂያ" },
];

export function PingNotificationModal({
	open,
	onClose,
	letterRef,
}: PingNotificationModalProps) {
	const form = useForm<z.infer<typeof NotificationSchema>>({
		resolver: zodResolver(NotificationSchema),
		defaultValues: {
			recipients: [],
			message: "",
			channels: [],
		},
	});
	const { control, handleSubmit } = form;

	async function handleFormSubmit(data: z.infer<typeof NotificationSchema>) {
		const payload: NotificationType = {
			to: data.recipients,
			message: data.message,
			channels: data.channels,
			details: {
				letter_ref: letterRef,
			},
		};

		try {
			await SendReminderNotification(payload);
			onClose();
			form.reset();
		} catch (error) {
			console.error("Notification sending failed:", error);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>ማሳወቂያ ላክ</DialogTitle>
					<DialogDescription>ለደብዳቤ ቁጥር {letterRef} አስታዋሽ ያዘጋጁ</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
						<FormField
							control={control}
							name="recipients"
							render={({ field }) => (
								<FormItem>
									<Select
										value={field.value[0] || ""} // Use the first value if present
										onValueChange={(value) => field.onChange([value])} // Wrap the value in an array
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select recipients" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectLabel>Recipients</SelectLabel>
												<SelectItem value="85bddf6c-ecb2-4346-ac71-f65e274ec3fa">
													User 1
												</SelectItem>
												<SelectItem value="190b459f-5efb-4d92-8216-b314b0c6ac12">
													User 2
												</SelectItem>
												{/* Add more recipients here */}
											</SelectGroup>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="message"
							render={({ field }) => (
								<FormItem>
									<Label>መልእክት ማስቀመጫ</Label>
									<Textarea {...field} placeholder="መልእክቶን እዚህ ያስገቡ..." />
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="channels"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-base">ማሳወቂያ ዓይነቶች</FormLabel>
									<FormDescription>ለመላክ የሚፈልጓቸውን የማሳወቂያ ዓይነቶች ይምረጡ።</FormDescription>
									{notificationChannels.map((channel) => (
										<div key={channel.id} className="flex items-center space-x-2">
											<Switch
												checked={field.value.includes(channel.id)}
												onCheckedChange={(checked) =>
													checked
														? field.onChange([...field.value, channel.id])
														: field.onChange(field.value.filter((id) => id !== channel.id))
												}
											/>
											<Label>{channel.label}</Label>
										</div>
									))}
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button type="submit">
								<Bell className="mr-2 h-5 w-5" />
								ማሳወቂያ ላክ
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
