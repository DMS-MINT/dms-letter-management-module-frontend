"use client";

import type {
	CreateCommentParams,
	UpdateCommentParams,
} from "@/actions/shared/action";
import {
	createComment,
	deleteComment,
	updateComment,
} from "@/actions/shared/action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToastMutation } from "@/hooks";
import { useUserStore } from "@/lib/stores";
import { convertToEthiopianDate } from "@/lib/utils/convertToEthiopianDate";
import type { LetterDetailType } from "@/types/letter_module";
import {
	Check,
	Dot,
	MessageSquare,
	MessageSquareText,
	Pen,
	Trash,
	X,
} from "lucide-react";
import { useState } from "react";

export default function ActivityFeed({ letter }: { letter: LetterDetailType }) {
	const currentUser = useUserStore((state) => state.currentUser);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [selectedCommentId, setSelectedCommentId] = useState<string>("");
	const [updatedMessage, setUpdatedMessage] = useState<string>("");
	const [message, setMessage] = useState<string>("");
	const { mutate: createCommentMutation } =
		useToastMutation<CreateCommentParams>(
			"createComment",
			createComment,
			"አስተያየትዎን በማስቀመጥ ላይ፣ እባክዎን ትንሽ ይጠብቁ..."
		);
	const { mutate: updateCommentMutation } =
		useToastMutation<UpdateCommentParams>(
			"updateComment",
			updateComment,
			"ለውጦችን በማስቀመጥ ላይ፣ እባክዎን ትንሽ ይጠብቁ..."
		);
	const { mutate: deleteCommentMutation } = useToastMutation<string>(
		"deleteComment",
		deleteComment,
		"አስተያየቶችዎን በመሰረዝ ላይ፣ እባክዎን ትንሽ ይጠብቁ..."
	);

	const toggleEditMode = (id: string = "", message: string = "") => {
		setSelectedCommentId(id);
		setUpdatedMessage(message);
	};

	const toggleCreateMode = () => {
		setCreateMode(!createMode);
		setSelectedCommentId("");
		setUpdatedMessage("");
	};

	return (
		<section id="comment_section" className="mb-10 flex flex-col">
			<div className="flex min-h-16 gap-6">
				<div className="flex w-[50px] flex-col items-center">
					<Separator
						orientation="vertical"
						className="w-[2px] flex-1 bg-transparent"
					/>
					<span className="h-fit w-fit rounded-full border-2 border-gray-300 p-px">
						<Dot size={20} className="text-gray-600" />
					</span>
					<Separator orientation="vertical" className="w-[2px] flex-1 bg-gray-300" />
				</div>
				<div className="flex gap-4 px-1 py-2">
					<Button className="bg-gray-500 hover:bg-gray-700">ሁሉም</Button>
					<Button variant="outline">አስተያየቶች ብቻ</Button>
					{createMode ? null : (
						<Button variant="outline" onClick={toggleCreateMode}>
							አዲስ አስተያየት
						</Button>
					)}
				</div>
			</div>

			{createMode ? (
				<div className="flex min-h-16 gap-6">
					<div className="flex w-[50px] flex-col items-center">
						<Separator
							orientation="vertical"
							className="w-[2px] flex-1 bg-gray-300"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="h-fit w-fit rounded-full border-2 border-gray-300 p-2">
									<MessageSquare size={18} className="text-gray-500" />
								</TooltipTrigger>
								<TooltipContent>
									<p>አዲስ አስተያየት</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<Separator
							orientation="vertical"
							className="w-[2px] flex-1 bg-gray-300"
						/>
					</div>

					<div className="card my-2 flex w-[800px] flex-col gap-4 px-1 py-2">
						<div className="flex items-center gap-4">
							<Avatar className="h-11 w-11">
								<AvatarFallback>
									{currentUser.full_name_am.substring(0, 2)}
								</AvatarFallback>
							</Avatar>
							<h4 className="text-base font-semibold">{`${currentUser.full_name_am} - ${currentUser.job_title.title_am}`}</h4>
							<div className="ml-auto flex gap-1">
								<Button
									variant="ghost"
									className="px-2"
									onClick={() => {
										const id = letter.id;
										createCommentMutation({ id, message });
									}}
								>
									<Check size={18} className="text-green-500" />
								</Button>
								<Button variant="ghost" className="px-2" onClick={toggleCreateMode}>
									<X size={18} className="text-red-500" />
								</Button>
							</div>
						</div>
						<div>
							<Textarea
								value={message}
								onChange={(e) => {
									setMessage(e.target.value);
								}}
							/>
						</div>
					</div>
				</div>
			) : null}

			{letter.comments.map(
				({ id, message, created_at, author: { full_name_am, job_title } }) => (
					<div key={id} className="flex min-h-16 gap-6">
						<div className="flex w-[50px] flex-col items-center">
							<Separator
								orientation="vertical"
								className="w-[2px] flex-1 bg-gray-300"
							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="h-fit w-fit rounded-full border-2 border-gray-300 p-2">
										<MessageSquareText size={18} className="text-gray-500" />
									</TooltipTrigger>
									<TooltipContent>
										<p>{convertToEthiopianDate(created_at)}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<Separator
								orientation="vertical"
								className="w-[2px] flex-1 bg-gray-300"
							/>
						</div>

						<div className="card my-2 flex w-[800px] flex-col gap-4 px-1 py-2">
							<div className="flex items-center gap-4">
								<Avatar className="h-11 w-11">
									<AvatarFallback>
										{full_name_am ? full_name_am.substring(0, 2) : ""}
									</AvatarFallback>
								</Avatar>
								<h4 className="text-base font-semibold">{`${full_name_am} - ${job_title.title_am}`}</h4>
								<div className="ml-auto flex gap-1">
									{selectedCommentId === id ? (
										<>
											<Button
												variant="ghost"
												className="px-2"
												onClick={() =>
													updateCommentMutation({
														comment_id: selectedCommentId,
														message: updatedMessage,
													})
												}
											>
												<Check size={18} className="text-green-500" />
											</Button>
											<Button
												variant="ghost"
												className="px-2"
												onClick={() => toggleEditMode()}
											>
												<X size={18} className="text-red-500" />
											</Button>
										</>
									) : (
										<>
											<Button
												variant="ghost"
												className="px-2"
												onClick={() => toggleEditMode(id, message)}
											>
												<Pen size={18} className="text-gray-500" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="px-2"
												onClick={() => deleteCommentMutation(id)}
											>
												<Trash size={18} className="text-gray-500" />
											</Button>
										</>
									)}
								</div>
							</div>
							<div>
								{selectedCommentId === id ? (
									<Textarea
										value={updatedMessage}
										onChange={(e) => {
											setUpdatedMessage(e.target.value);
										}}
									/>
								) : message ? (
									message
								) : (
									""
								)}
							</div>
						</div>
					</div>
				)
			)}

			<div className="flex min-h-16 gap-6">
				<div className="flex w-[50px] flex-col items-center">
					<Separator orientation="vertical" className="w-[2px] flex-1 bg-gray-300" />
					<span className="h-fit w-fit rounded-full border-2 border-gray-300 p-px">
						<Dot size={20} className="text-gray-600" />
					</span>
					<Separator
						orientation="vertical"
						className="w-[2px] flex-1 bg-transparent"
					/>
				</div>
				<div className="flex items-center px-1">
					<p className="text-gray-700">
						{`${letter.owner.full_name_am} ይህን ደብዳቤ 
            ${convertToEthiopianDate(letter.created_at)} ፈጥረዋል።`}
					</p>
				</div>
			</div>
		</section>
	);
}
