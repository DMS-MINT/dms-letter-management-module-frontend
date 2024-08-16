"use client";

import { shareLetter } from "@/actions/letter_module/workflowActions";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
// 	Dialog,
// 	DialogClose,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
import { useToastMutation } from "@/hooks";
// import { useParticipantStore } from "@/stores";
import type {
	// LetterDetailType,
	ShareLetterRequestType,
} from "@/types/letter_module";
// import { RoleEnum } from "@/types/letter_module";
import { memo, useState } from "react";
// import ReactSelect from "react-select";
import * as uuidv4 from "uuid";
// import { Label } from "../ui/label";

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
	// {
	// 	 id:uuidv4.v4(),
	//   value: "transfer_ownership",
	//   label: "ባለቤትነትን ያስተላልፉ",
	// },
	// {
	//   id:uuidv4.v4(),
	//   value: "remove_access",
	//   label: "ፈቃድን ያስወግዱ",
	// },
];

function ShareLetterDialog() {
	// const collaborators = useParticipantStore(
	// 	(state) => state.participants
	// ).filter((participant) => participant.role === RoleEnum.COLLABORATOR);
	// const { collaborator } = useParticipantStore((state) => {
	// 	state.participants.filter(
	// 		(participant) => participant.role === RoleEnum.COLLABORATOR
	// 	);
	// 	state.setParticipants;
	// });

	const [formData, setFormData] = useState<FormDataType>({
		message: "",
		permissions: "can_view_letter",
	});

	const { mutate: shareLetterMutation } = useToastMutation<
		[string, ShareLetterRequestType]
	>("shareLetter", shareLetter, "ደብዳቤውን ለተገለጹት ተባባሪዎች በማጋራት፣ እባክዎ ይጠብቁ...");

	// const getNewCollaborators = useCallback(() => {
	// 	const existingCollaborators = letter.participants.filter(
	// 		(participant) => participant.role === RoleEnum.COLLABORATOR
	// 	);

	// 	return collaborators.filter(
	// 		(collaborator) =>
	// 			!existingCollaborators.some((existing) => existing.id === collaborator.id)
	// 	);
	// }, [letter.participants, collaborators]);

	// const removeNewCollaborators = useCallback(() => {
	// 	const newCollaborators = getNewCollaborators();
	// 	console.log(
	// 		"🚀 ~ removeNewCollaborators ~ newCollaborators:",
	// 		newCollaborators
	// 	);
	// }, [getNewCollaborators]);

	// const getNewCollaboratorsIds = useCallback(() => {
	// 	const newCollaborators = getNewCollaborators();
	// 	return newCollaborators.map((collaborator) => collaborator.user.id);
	// }, [getNewCollaborators]);

	// const handleMessageChange = (message: string) => {
	// 	setFormData((prevData: FormDataType) => ({ ...prevData, message }));
	// };

	// const handlePermissionChange = (value: PermissionType) => {
	// 	setFormData((prevData: FormDataType) => ({
	// 		...prevData,
	// 		permissions: value,
	// 	}));
	// };

	// const handleSubmit = () => {
	// 	shareLetterMutation([
	// 		letter.reference_number,
	// 		{
	// 			to: getNewCollaboratorsIds(),
	// 			message: formData.message,
	// 			permissions: formData.permissions,
	// 			// permissions: [formData.permissions],
	// 		},
	// 	]);
	// };

	return (
		<div></div>
		// <Dialog onOpenChange={removeNewCollaborators}>
		// 	<DialogTrigger asChild>
		// 		<Button variant={"outline"}>ደብዳቤውን አጋራ</Button>
		// 	</DialogTrigger>
		// 	<DialogContent
		// 		className="flex max-h-[40rem] min-w-[45rem] max-w-[45rem] flex-col"
		// 		// aria-describedby="dialog-description"
		// 	>
		// 		<DialogHeader className="flex-1 p-2">
		// 			<DialogTitle>የደብዳቤ ማጋሪያ</DialogTitle>
		// 			<DialogDescription>
		// 				ይህን ደብዳቤ ልታጋራቸው የምትፈልጋቸውን ሰዎች ምረጥ፣ ፈቃዶቻቸውን አዘጋጅ እና ከደብዳቤው ጋር የሚላክ መልእክት
		// 				ጻፍ።
		// 			</DialogDescription>
		// 		</DialogHeader>
		// 		<section>
		// 			<div className="flex items-center gap-1.5 py-3">
		// 				<Label className="w-5">ለ</Label>
		// 				<ReactSelect
		// 					isMulti
		// 					isClearable={true}
		// 					// isDisabled={isLetterReadOnly}
		// 					onChange={handleMultiSelectChange}
		// 					options={users}
		// 					name={RoleEnum["COLLABORATOR"]}
		// 					placeholder="ለማን እንደሚጋራ ይምረጡ"
		// 					getOptionLabel={getLabel}
		// 					getOptionValue={getValue}
		// 					className="w-full"
		// 					isOptionDisabled={(option) =>
		// 						letter.participants.some(
		// 							(participant) => participant.user.id === option.id
		// 						)
		// 					}
		// 				/>
		// 				{collaborators.length > 0 ? (
		// 					<Select
		// 						value={formData.permissions}
		// 						onValueChange={handlePermissionChange}
		// 					>
		// 						<SelectTrigger className="w-[150px] text-start">
		// 							<SelectValue placeholder="ማየት ይችላል" />
		// 						</SelectTrigger>
		// 						<SelectContent>
		// 							{permissions.map(({ id, label, value }) => (
		// 								<SelectItem key={id} value={value}>
		// 									{label}
		// 								</SelectItem>
		// 							))}
		// 						</SelectContent>
		// 					</Select>
		// 				) : null}
		// 			</div>

		// 			<div className="flex flex-col gap-2 mt-4">
		// 				{getNewCollaboratorsIds().length === 0 ? (
		// 					<div className="flex flex-col gap-2">
		// 						<h4 className="font-semibold">ደብዳቤው ያላቸው ሰዎች</h4>

		// 						<div className="flex items-center gap-3">
		// 							<Avatar className="h-11 w-11">
		// 								<AvatarFallback>
		// 									{letter.owner?.full_name.substring(0, 2)}
		// 								</AvatarFallback>
		// 							</Avatar>
		// 							<p>{`${letter.owner.full_name} - ${letter.owner.job_title}`}</p>
		// 							<p className="ml-auto text-gray-400">ባለቤት</p>
		// 						</div>

		// 						{letter.participants
		// 							.filter(
		// 								(participant) =>
		// 									participant.role === RoleEnum.COLLABORATOR &&
		// 									participant.user.user_type === "member"
		// 							)
		// 							.map((participant) => {
		// 								const { id, user } = participant;
		// 								if (user.user_type === "member") {
		// 									const { full_name, job_title } = user;
		// 									return (
		// 										<div key={id} className="flex items-center gap-3">
		// 											<Avatar className="h-11 w-11">
		// 												<AvatarFallback>{full_name.substring(0, 2)}</AvatarFallback>
		// 											</Avatar>
		// 											<p>{`${full_name} - ${job_title}`}</p>
		// 											{/* <p className="ml-auto text-gray-400">ባለቤት</p> */}
		// 										</div>
		// 									);
		// 								}
		// 								return null;
		// 							})}
		// 					</div>
		// 				) : (
		// 					<Textarea
		// 						placeholder="መልእክት ማስቀመጫ"
		// 						className="bg-gray-100"
		// 						value={formData.message || ""}
		// 						onChange={(e) => handleMessageChange(e.target.value)}
		// 					/>
		// 				)}
		// 			</div>
		// 		</section>
		// 		<DialogFooter>
		// 			<DialogClose asChild>
		// 				<Button variant={"outline"}>ሰርዝ</Button>
		// 			</DialogClose>
		// 			<Button
		// 				disabled={
		// 					formData.message === "" || getNewCollaboratorsIds().length === 0
		// 						? true
		// 						: false
		// 				}
		// 				onClick={handleSubmit}
		// 			>
		// 				ምራ
		// 			</Button>
		// 		</DialogFooter>
		// 	</DialogContent>
		// </Dialog>
	);
}

export default memo(ShareLetterDialog);
