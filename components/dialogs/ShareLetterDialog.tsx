"use client";

import { deleteParticipant } from "@/actions/letter_module/participantActions";
import { shareLetter } from "@/actions/letter_module/workflowActions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToastMutation } from "@/hooks";
import {
	useCollaboratorStore,
	useLetterRevisionStore,
	useUserStore,
} from "@/lib/stores";
import { getInitials } from "@/lib/utils/getInitials";
import {
	generateDraftParticipant,
	getDefaultValue,
	isUserParticipantType,
} from "@/lib/utils/participantUtils";
import { RoleEnum, type ShareLetterRequestType } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
import type { UserType } from "@/types/user_module";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Share2, X } from "lucide-react";
import { memo, useCallback, useState } from "react";
import * as uuidv4 from "uuid";
import { ParticipantSelector } from "../forms";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

type Props = {
	owner: UserType;
};

type PermissionType =
	| "can_view_letter"
	| "can_comment_letter"
	| "can_update_letter"
	| "can_share_letter";

type FormDataType = {
	message: string;
	permissions: PermissionType;
};
type SelectType = {
	id: string;
	value: PermissionType;
	label: string;
};

const permissions: SelectType[] = [
	{
		id: uuidv4.v4(),
		value: "can_view_letter",
		label: "ማየት ይችላል",
	},
	{
		id: uuidv4.v4(),
		value: "can_update_letter",
		label: "ማረም ይችላል",
	},
	{
		id: uuidv4.v4(),
		value: "can_comment_letter",
		label: "አስተያየት መስጠት ይችላል",
	},
	{
		id: uuidv4.v4(),
		value: "can_share_letter",
		label: "ማጋራት ይችላል",
	},
];

function ShareLetterDialog({ owner }: Props) {
	const { id, language, participants, current_state } = useLetterRevisionStore();
	const {
		addParticipant,
		removeParticipant,
		resetParticipants,
		participants: newCollaborators,
	} = useCollaboratorStore();

	const { mutate: shareLetterMutation } = useToastMutation<
		[string, ShareLetterRequestType]
	>("shareLetter", shareLetter, "ደብዳቤውን ለተገለጹት ተባባሪዎች በማጋራት፣ እባክዎ ይጠብቁ...");

	const { mutate: deleteParticipantMutation } = useToastMutation<[string]>(
		"deleteParticipant",
		deleteParticipant,
		"ፈቃዶችን በማስወገድ ላይ፣ እባክዎ ይጠብቁ..."
	);

	const currentUser = useUserStore((state) => state.currentUser);
	const [formData, setFormData] = useState<FormDataType>({
		message: "",
		permissions: "can_view_letter",
	});

	const isForwardingEnabled = useCallback(() => {
		const my_role = participants
			.filter(isUserParticipantType)
			.find((participant) => participant.user.id === currentUser.id)?.role;

		return (
			current_state === "Published" &&
			(my_role === "Primary Recipient" || my_role === "Collaborator")
		);
	}, [participants, currentUser, current_state]);

	const handleMessageChange = (message: string) => {
		setFormData((prevData: FormDataType) => ({ ...prevData, message }));
	};

	const handlePermissionChange = (value: PermissionType) => {
		setFormData((prevData: FormDataType) => ({
			...prevData,
			permissions: value,
		}));
	};

	const handleSubmit = () => {
		shareLetterMutation([
			id,
			{
				participants: generateDraftParticipant(newCollaborators),
				message: formData.message,
				permissions: isForwardingEnabled()
					? ["can_share_letter", "can_comment_letter"]
					: [formData.permissions],
			},
		]);
	};

	return (
		<Dialog onOpenChange={resetParticipants}>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<DialogTrigger asChild>
							<Button size={"icon"} variant={"outline"}>
								<Share2 size={20} />
							</Button>
						</DialogTrigger>
					</TooltipTrigger>
					<TooltipContent side="bottom" align="center">
						<p>ደብዳቤውን አጋራ</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<DialogContent className="max-h-[40rem] min-w-[50rem] max-w-[45rem]">
				<DialogHeader>
					<DialogTitle>የደብዳቤ ማጋሪያ</DialogTitle>
					<DialogDescription>
						ይህን ደብዳቤ ልታጋራቸው የምትፈልጋቸውን ሰዎች ምረጥ፣ ፈቃዶቻቸውን አዘጋጅ እና ከደብዳቤው ጋር የሚላክ መልእክት
						ጻፍ።
					</DialogDescription>
				</DialogHeader>
				<section>
					<div className="flex items-center gap-2">
						<Label className="w-5">ለ</Label>
						<ParticipantSelector
							language={language}
							prefix={""}
							isDisabled={false}
							name={RoleEnum["COLLABORATOR"]}
							placeholder="እባክዎ የደብዳቤው ለማን እንደሚጋራ ይምረጡ"
							participantScope="internal_staff"
							participants={participants}
							addParticipant={addParticipant}
							removeParticipant={removeParticipant}
							value={getDefaultValue(newCollaborators, RoleEnum["COLLABORATOR"])}
							classNamePrefix="none"
						/>
						{!isForwardingEnabled() && newCollaborators.length ? (
							<Select
								value={formData.permissions}
								onValueChange={handlePermissionChange}
							>
								<SelectTrigger className="w-[200px] text-start">
									<SelectValue placeholder="ማየት ይችላል" />
								</SelectTrigger>
								<SelectContent>
									{permissions.map(({ id, label, value }) => (
										<SelectItem key={id} value={value}>
											{label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : null}
					</div>
					<div className="mt-4 flex flex-col gap-2">
						{!newCollaborators.length ? (
							<div className="flex flex-col gap-2">
								<h4 className="font-semibold">ደብዳቤው ያላቸው ሰዎች</h4>

								<div className="flex items-center gap-3">
									<Avatar className="h-11 w-11">
										<AvatarFallback>
											{getInitials(
												language === LanguageEnum.English
													? owner.full_name_en
													: owner.full_name_am
											)}
										</AvatarFallback>
									</Avatar>
									<p className="flex flex-col">
										<span>
											{language === LanguageEnum.English
												? owner.job_title.title_en
												: owner.job_title.title_am}
										</span>
										<span className="text-sm text-gray-600">
											{language === LanguageEnum.English
												? owner.full_name_en
												: owner.full_name_am}
										</span>
									</p>
									<p className="ml-auto text-gray-400">ባለቤት</p>
								</div>

								{participants
									.filter(
										(participant) =>
											participant.participant_type === "user" &&
											participant.role === RoleEnum.COLLABORATOR
									)
									.map((p) => {
										const collaborator = p as {
											id: string;
											role: RoleEnum;
											user: UserType;
											participant_type: "user";
										};

										return (
											<div key={collaborator.id} className="flex items-center gap-3">
												<Avatar className="h-11 w-11">
													<AvatarFallback>
														{getInitials(
															language === LanguageEnum.English
																? collaborator.user.full_name_en
																: collaborator.user.full_name_am
														)}
													</AvatarFallback>
												</Avatar>
												<p className="flex flex-col">
													<span>
														{language === LanguageEnum.English
															? collaborator.user.job_title.title_en
															: collaborator.user.job_title.title_am}
													</span>
													<span className="text-sm text-gray-600">
														{language === LanguageEnum.English
															? collaborator.user.full_name_en
															: collaborator.user.full_name_am}
													</span>
												</p>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger className="ml-auto" asChild>
															<Button
																size={"sm"}
																variant={"ghost"}
																onClick={() => deleteParticipantMutation([collaborator.id])}
															>
																<X size={15} />
															</Button>
														</TooltipTrigger>
														<TooltipContent side="bottom" align="center">
															<p>ፍቃድ ያስወግድ</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
										);
									})}
							</div>
						) : (
							<Textarea
								placeholder="መልእክት ማስቀመጫ"
								value={formData.message || ""}
								onChange={(e) => handleMessageChange(e.target.value)}
							/>
						)}
					</div>
				</section>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"outline"}>ሰርዝ</Button>
					</DialogClose>
					<Button
						disabled={!newCollaborators.length || !formData.message}
						onClick={handleSubmit}
					>
						ምራ
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default memo(ShareLetterDialog);
