"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { convertToEthiopianDateAndTime } from "@/lib/utils/convertToEthiopianDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DateTimePicker } from "../ui/datetime-picker"; // Adjust import if necessary

const NotificationTypeSchema = z.object({
	recipients: z.boolean().default(false),
	sharedWith: z.boolean().default(false),
	notificationTypes: z.array(z.string()).default([]),
	notificationDate: z.date().optional(),
});

interface PingNotificationModalProps {
	open: boolean;
	onClose: () => void;
}

const notificationTypes = [
	{
		id: "email",
		label: "EMAIL- የኢሜል ማሳወቂያ",
		description: "የኢሜል ማሳወቂያ ለመላክ ይህንን ይጫኑ",
	},
	{
		id: "sms",
		label: "SMS- የኤስኤምኤስ ማሳወቂያ",
		description: "የኤስኤምኤስ ማሳወቂያ ለመላክ ይህንን ይጫኑ",
	},
	{
		id: "inApp",
		label: "IN-APP- በመተግበሪያ ማሳወቂያ",
		description: "በመተግበሪያ ማሳወቂያ ለመላክ ይህንን ይጫኑ",
	},
] as const;

export function PingNotificationModal({
	open,
	onClose,
}: PingNotificationModalProps) {
	const form = useForm<z.infer<typeof NotificationTypeSchema>>({
		resolver: zodResolver(NotificationTypeSchema),
		defaultValues: {
			recipients: false,
			sharedWith: false,
			notificationTypes: [],
			notificationDate: new Date(),
		},
	});
	const [date, setDate] = useState<Date | undefined>(undefined);
	const { control, handleSubmit } = form;

	function handleFormSubmit(data: z.infer<typeof NotificationTypeSchema>) {
		const formattedDate = date ? new Date(date).toISOString() : undefined;

		console.log({
			...data,
			notificationDate: formattedDate,
		});
		onClose();
		form.reset();
	}

	const formattedDate = date ? new Date(date).toISOString() : undefined;
	const { time: timeInEthiopia, date: dateInEthiopia } = formattedDate
		? convertToEthiopianDateAndTime(formattedDate)
		: { time: "", date: "" };

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>ማሳወቂያ መላክ ይፈልጋሉ</DialogTitle>
					<DialogDescription>ለሁሉም ተቀባዮች ማሳወቂያ መላክ ይፈልጋሉ?</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
						<FormField
							control={control}
							name="recipients"
							render={({ field }) => (
								<FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4 shadow">
									<FormControl>
										<Checkbox
											checked={field.value}
											onCheckedChange={field.onChange}
											className="h-5 w-5"
										/>
									</FormControl>
									<div className="space-y-1 leading-none">
										<FormLabel>ለተቀባይቶች</FormLabel>
										<FormDescription>
											ሁሉንም ተቀባዮች ለማሳወቅ በዚህ ሳጥን ላይ ምልክት ያድርጉ።
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>

						<FormField
							control={control}
							name="notificationTypes"
							render={({ field }) => (
								<FormItem>
									<div className="mb-4">
										<FormLabel className="text-base">ማሳወቂያ ዓይነቶች</FormLabel>
										<FormDescription>ለመላክ የሚፈልጓቸውን ማሳወቂያ ዓይነቶች ይምረጡ።</FormDescription>
									</div>
									{notificationTypes.map((type) => (
										<FormItem
											key={type.id}
											className="flex items-center space-x-3 space-y-0 rounded-md border p-2 shadow"
										>
											<FormControl>
												<Checkbox
													checked={field.value.includes(type.id)}
													onCheckedChange={(checked) => {
														field.onChange(
															checked
																? [...field.value, type.id]
																: field.value.filter((value) => value !== type.id)
														);
													}}
													className="h-5 w-5"
												/>
											</FormControl>
											<div className="space-y-1 leading-none">
												<FormLabel>{type.label}</FormLabel>
												<FormDescription>{type.description}</FormDescription>
											</div>
										</FormItem>
									))}
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-2">
							<div className="mb-4">
								<FormLabel className="text-base">ማሳወቂያ ጊዜ</FormLabel>
								<FormDescription>ማሳወቂያ የሚላክበትን ሰዓት እና ቀን ይምረጡ።</FormDescription>
							</div>
							<div className="flex items-center gap-4">
								<DateTimePicker value={date} onChange={setDate} />
								<div className="flex flex-col items-center text-xs font-normal text-muted-foreground">
									<span>{timeInEthiopia}</span>
									<span className="flex gap-1 ">
										{" "}
										<CalendarIcon size={12} />
										{dateInEthiopia}
									</span>
									<span>በኢትዮጵያ ቀን አቆጣጠር</span>
								</div>
							</div>
						</div>

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
