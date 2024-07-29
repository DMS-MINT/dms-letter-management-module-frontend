"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
	LetterDetailType,
	ShareLetterRequestType,
} from "@/types/letter_module";
import { RoleEnum } from "@/types/letter_module";
import { useState } from "react";
import * as uuidv4 from "uuid";

type SelectType = {
	id: string;
	value: string;
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

export default function ShareLetterDialog({
	letter,
}: {
	letter: LetterDetailType;
}) {
	const [formData] = useState<ShareLetterRequestType>({
		to: [],
		message: "",
		permissions: "can_view_letter",
	});

	// const filteredOptions = useMemo(() => {
	// 	return contacts.filter((contact) => {
	// 		return !letterDetails?.participants.some(
	// 			(participant) => participant.user.id === contact.id
	// 		);
	// 	});
	// }, [contacts, letterDetails?.participants]);

	// const handleSelectChange = (
	// 	option: readonly ContactType[],
	// 	actionMeta: ActionMeta<ContactType>
	// ) => {
	// 	const { action, option: selectedOption, removedValue } = actionMeta;

	// 	const handleSelectOption = (selectedOption: ContactType) => {
	// 		const user_id = selectedOption.id;
	// 		setFormData((prevData: IShareLetterFormData) => ({
	// 			...prevData,
	// 			to: [...prevData.to, user_id],
	// 		}));
	// 	};

	// 	const handleRemoveValue = (removedValue: ContactType) => {
	// 		const user_id = removedValue.id;
	// 		const ids = formData.to.filter((id) => id !== user_id);
	// 		setFormData((prevData: IShareLetterFormData) => ({
	// 			...prevData,
	// 			to: ids,
	// 		}));
	// 	};
	// 	const handleClear = () => {
	// 		setFormData((prevData: IShareLetterFormData) => ({
	// 			...prevData,
	// 			to: [],
	// 		}));
	// 	};

	// 	switch (action) {
	// 		case "select-option":
	// 			if (selectedOption) handleSelectOption(selectedOption);
	// 			break;
	// 		case "remove-value":
	// 			if (removedValue) handleRemoveValue(removedValue);
	// 			break;
	// 		case "clear":
	// 			handleClear();
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// };

	// const getLabel = (option: ContactType): string => {
	// 	if (option.user_type === "member") {
	// 		return `${option.full_name} - ${option.job_title}`;
	// 	} else {
	// 		return `${option.name}`;
	// 	}
	// };

	// const getValue = (option: ContactType): string => {
	// 	if (option.user_type === "member") {
	// 		return option.id;
	// 	} else {
	// 		return option.name;
	// 	}
	// };

	// const handleMessageChange = (message: string) => {
	// 	setFormData((prevData: IShareLetterFormData) => ({ ...prevData, message }));
	// };

	// const handlePermissionChange = (value: PermissionType) => {
	// 	setFormData((prevData: IShareLetterFormData) => ({
	// 		...prevData,
	// 		permissions: [value],
	// 	}));
	// };

	const handleSubmit = () => {
		// dispatch(
		// 	shareLetter({
		// 		reference_number: letterDetails?.reference_number,
		// 		participants: formData,
		// 	})
		// );
		// setFormData({
		// 	to: [],
		// 	message: "",
		// 	permissions: ["can_view_letter"],
		// });
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"}>ደብዳቤውን አጋራ</Button>
			</DialogTrigger>
			<DialogContent className="flex max-h-[40rem] min-w-[45rem] max-w-[45rem] flex-col">
				<DialogHeader className="flex-1 p-2">
					<DialogTitle>የደብዳቤ መምሪያ</DialogTitle>

					<div className="flex items-center gap-1.5 py-3">
						<Label className="w-5">ለ</Label>
						{/* <ReactSelect
							isMulti
							onChange={handleSelectChange}
							options={filteredOptions.filter(
								(contact) => contact.user_type === "member"
							)}
							placeholder="ለማን እንደሚጋራ ይምረጡ"
							getOptionLabel={getLabel}
							getOptionValue={getValue}
							className="w-full"
						/> */}
						{formData.to.length > 0 ? (
							<Select
								value={formData.permissions[0]}
								// onValueChange={handlePermissionChange}
							>
								<SelectTrigger className="w-[150px]">
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
						{formData.to.length === 0 ? (
							<div className="flex flex-col gap-2">
								<h4 className="font-semibold">ደብዳቤው ያላቸው ሰዎች</h4>

								<div className="flex items-center gap-3">
									<Avatar className="h-11 w-11">
										<AvatarFallback>
											{letter.owner?.full_name.substring(0, 2)}
										</AvatarFallback>
									</Avatar>
									<p>{`${letter.owner.full_name} - ${letter.owner.job_title}`}</p>
									<p className="ml-auto text-gray-400">ባለቤት</p>
								</div>

								{letter.participants
									.filter(
										(participant) =>
											participant.role === RoleEnum.COLLABORATOR &&
											participant.user.user_type === "member"
									)
									.map((participant) => {
										const { id, user } = participant;
										if (user.user_type === "member") {
											const { full_name, job_title } = user;
											return (
												<div key={id} className="flex items-center gap-3">
													<Avatar className="h-11 w-11">
														<AvatarFallback>{full_name.substring(0, 2)}</AvatarFallback>
													</Avatar>
													<p>{`${full_name} - ${job_title}`}</p>
													{/* <p className="ml-auto text-gray-400">ባለቤት</p> */}
												</div>
											);
										}
										return null;
									})}
							</div>
						) : (
							<Textarea
								placeholder="መልእክት ማስቀመጫ"
								className="bg-gray-100"
								value={formData.message || ""}
								// onChange={(e) => handleMessageChange(e.target.value)}
							/>
						)}
					</div>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant={"outline"}>ሰርዝ</Button>
					</DialogClose>
					<Button
						disabled={
							formData.message === "" || formData.to.length === 0 ? true : false
						}
						onClick={handleSubmit}
					>
						ምራ
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
