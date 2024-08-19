"use client";

import { sendReminderNotification } from "@/actions/notification/action";
import { getUsers } from "@/actions/user_module/action";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
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
import { useParticipantSelector, useToastMutation } from "@/hooks";
import { useCollaboratorStore, useLetterRevisionStore } from "@/lib/stores";
import {
	getLabel,
	getValue,
	isContactType,
	isEnterpriseType,
	isOptionDisabled,
	isUserParticipantType,
	isUserType,
	type OptionType,
} from "@/lib/utils/participantUtils";
import { RoleEnum } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import type { NotificationCreateDTO } from "@/types/shared/NotificationType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import ReactSelect, { components, type OptionProps } from "react-select";
import { toast } from "sonner";
import { z } from "zod";
import { OptionItem } from "../buttons";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

export type NotificationType = {
	to: string[];
	message: string;
	channels: string[];
	details: Record<string, unknown>;
};

const NotificationChannelEnum = z.enum(["in-app", "email", "sms"]);

const NotificationSchema = z.object({
	message: z.string().min(1, "መልእክት ባዶ ሊሆን አይችልም።"),
	channels: z.array(NotificationChannelEnum),
});

type Props = {
	open: boolean;
	handleClick: () => void;
	current_state: string;
};

const notificationChannels = [
	{ id: NotificationChannelEnum.Enum.email, label: "በኢሜል ማሳወቂያ" },
	{ id: NotificationChannelEnum.Enum.sms, label: " የአጭር ጽሁፍ መልዕክት ማሳወቂያ (SMS)" },
];

export function PingNotificationModal({
	open,
	handleClick,
	current_state,
}: Props) {
	const { data: options } = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			try {
				const response = await getUsers(true);

				if (!response.ok) throw response;

				return response.message;
			} catch (error: any) {
				toast.dismiss();
				toast.error(error.message);
			}
		},
		staleTime: Infinity,
	});
	const form = useForm<z.infer<typeof NotificationSchema>>({
		resolver: zodResolver(NotificationSchema),
		defaultValues: {
			message: "",
			channels: [],
		},
	});

	const message = form.watch("message");

	const { control, handleSubmit } = form;
	const {
		addParticipant,
		removeParticipant,
		resetParticipants,
		participants: recipients,
	} = useCollaboratorStore();

	const { handleMultiSelectChange } = useParticipantSelector({
		addParticipant,
		removeParticipant,
	});

	const { language, participants, reference_number } = useLetterRevisionStore();

	const { mutate } = useToastMutation<[NotificationCreateDTO]>(
		"sendReminderNotification",
		sendReminderNotification,
		"የማስታወሻ መልእክቱ እየተላከ ነው፣ በቅርቡ ይደርሳል..."
	);

	const Option = (props: OptionProps<OptionType>) => {
		const { data } = props;

		return (
			<div>
				<components.Option {...props} className="!p-1">
					{isUserType(data) ? (
						<OptionItem
							primaryText={
								language === LanguageEnum.English
									? data.job_title.title_en
									: data.job_title.title_am
							}
							secondaryText={
								language === LanguageEnum.English
									? data.full_name_en
									: data.full_name_am
							}
						/>
					) : null}
					{isEnterpriseType(data) ? (
						<OptionItem
							imageSrc={data.logo}
							primaryText={
								language === LanguageEnum.English ? data.name_en : data.name_am
							}
							secondaryText={
								language === LanguageEnum.English
									? data.address.city_en
									: data.address.city_am
							}
						/>
					) : null}
					{isContactType(data) ? (
						<OptionItem
							primaryText={
								language === LanguageEnum.English
									? data.full_name_en
									: data.full_name_am
							}
							secondaryText={
								language === LanguageEnum.English
									? data.address.city_en
									: data.address.city_en
							}
						/>
					) : null}
				</components.Option>
			</div>
		);
	};

	const getCollaborators = useMemo(() => {
		return participants
			.filter((participant) => participant.role === RoleEnum.COLLABORATOR)
			.filter(isUserParticipantType)
			.map((participant) => participant.user);
	}, [participants]);

	const getUserIds = useMemo(() => {
		return recipients
			.filter((participant) => participant.role === RoleEnum.COLLABORATOR)
			.filter(isUserParticipantType)
			.map((participant) => participant.user.id);
	}, [recipients]);

	const handleFormSubmit = (data: z.infer<typeof NotificationSchema>) => {
		const payload: NotificationCreateDTO = {
			to: getUserIds,
			message: data.message,
			channels: data.channels,
			details: {
				source: "user",
				letter_ref: reference_number,
			},
		};

		mutate([payload]);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={() => {
				handleClick();
				form.reset();
				form.clearErrors();
				resetParticipants();
			}}
		>
			<DialogContent className="max-h-[40rem] min-w-[45rem] max-w-[45rem]">
				<DialogHeader>
					<DialogTitle>ማስታወሻ ማዋቀሪያ</DialogTitle>
					<DialogDescription>ተቀባዩን እና መልእክት በማስገባት ማስታወሻ ያዋቅሩ።</DialogDescription>
				</DialogHeader>
				<ReactSelect
					isMulti
					name={RoleEnum.COLLABORATOR}
					isClearable={true}
					isDisabled={false}
					options={
						current_state === "Draft" || current_state === "Rejected"
							? getCollaborators
							: options
					}
					getOptionLabel={(option) => getLabel(option, language)}
					getOptionValue={(option) => getValue(option, language)}
					onChange={handleMultiSelectChange}
					className="w-full"
					placeholder="ማሳወቂያውን ለማን እንደሚልኩ ይምረጡ..."
					classNamePrefix="none"
					components={{ Option }}
					isOptionDisabled={(option) => isOptionDisabled(option, recipients)}
				/>
				<Form {...form}>
					<form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
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
							<DialogClose asChild>
								<Button type="button" variant="outline">
									ዝጋ
								</Button>
							</DialogClose>
							<Button type="submit" disabled={!message || !recipients.length}>
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
