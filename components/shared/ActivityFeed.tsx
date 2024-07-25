"use client";

import { Button } from "@/components/ui/button";
import {
	Dot,
	MessageSquare,
	MessageSquareText,
	Trash,
	Check,
	X,
	Pen,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChangeEvent, useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { LetterDetailType } from "@/types/letter_module";
import { convertToEthiopianDate } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { create_comment } from "@/actions/shared/action";
import type {
	CreateCommentParams,
	UpdateCommentParams,
} from "@/actions/shared/action";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks";
import { selectMyProfile } from "@/lib/features/user/userSlice";

export default function ActivityFeed({ letter }: { letter: LetterDetailType }) {
	const myProfile = useAppSelector(selectMyProfile);
	const [createMode, setCreateMode] = useState<boolean>(false);
	const [selectedCommentId, setSelectedCommentId] = useState<string>("");
	const [updatedContent, setUpdatedContent] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const { mutate: createComment } = useMutation({
		mutationKey: ["createComment"],
		mutationFn: (params: CreateCommentParams) => create_comment(params),
		onMutate: () => {
			toast.dismiss();
			toast.loading("Creating comment, Please wait...");
		},
		onSuccess: (data) => {
			toast.dismiss();
			toast.success(data.message);
		},
		onError: (errorMessage: string) => {
			toast.dismiss();
			toast.error(errorMessage);
		},
	});

	const toggleEditMode = (id: string = "", content: string = "") => {
		setSelectedCommentId(id);
		setUpdatedContent(content);
	};

	const toggleCreateMode = () => {
		setCreateMode(!createMode);
		setSelectedCommentId("");
		setUpdatedContent("");
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setContent(e.target.value);
	};

	const dispatchUpdateComment = () => {
		// dispatch(
		// 	updateComment({ comment_id: selectedCommentId, content: updatedContent })
		// );
	};
	const dispatchDeleteComment = (id: string) => {
		// dispatch(deleteComment(id));
	};

	return myProfile ? (
		<section id="comment_section" className="flex flex-col mb-10">
			<div className="flex gap-6 min-h-16">
				<div className="flex flex-col items-center w-[50px]">
					<Separator
						orientation="vertical"
						className="w-[2px] flex-1 bg-transparent"
					/>
					<span className="border-2 border-gray-300 rounded-full p-px h-fit w-fit">
						<Dot size={20} className="text-gray-600" />
					</span>
					<Separator orientation="vertical" className="bg-gray-300 w-[2px] flex-1" />
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
				<div className="flex gap-6 min-h-16">
					<div className="flex flex-col items-center w-[50px]">
						<Separator
							orientation="vertical"
							className="bg-gray-300 w-[2px] flex-1"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger className="border-2 border-gray-300 rounded-full p-2 h-fit w-fit">
									<MessageSquare size={18} className="text-gray-500" />
								</TooltipTrigger>
								<TooltipContent>
									<p>አዲስ አስተያየት</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<Separator
							orientation="vertical"
							className="bg-gray-300 w-[2px] flex-1"
						/>
					</div>

					<div className="flex flex-col gap-4 px-1 py-2 my-2 card w-[800px]">
						<div className="flex gap-4 items-center">
							<Avatar className="w-11 h-11">
								<AvatarFallback>
									{myProfile.full_name ? myProfile.full_name.substring(0, 2) : ""}
								</AvatarFallback>
							</Avatar>
							<h4 className="text-base font-semibold">{`${myProfile.full_name} - ${myProfile.job_title}`}</h4>
							<div className="flex gap-1 ml-auto">
								<Button
									variant="ghost"
									className="px-2"
									onClick={() => {
										const reference_number = letter.reference_number;
										createComment({ reference_number, content });
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
								value={content}
								onChange={(e) => {
									handleContentChange(e);
								}}
							/>
						</div>
					</div>
				</div>
			) : null}

			{letter.comments.map(
				({ id, content, created_at, author: { full_name, job_title } }) => (
					<div key={id} className="flex gap-6 min-h-16">
						<div className="flex flex-col items-center w-[50px]">
							<Separator
								orientation="vertical"
								className="bg-gray-300 w-[2px] flex-1"
							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger className="border-2 border-gray-300 rounded-full p-2 h-fit w-fit">
										<MessageSquareText size={18} className="text-gray-500" />
									</TooltipTrigger>
									<TooltipContent>
										<p>{convertToEthiopianDate(created_at)}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
							<Separator
								orientation="vertical"
								className="bg-gray-300 w-[2px] flex-1"
							/>
						</div>

						<div className="flex flex-col gap-4 px-1 py-2 my-2 card w-[800px]">
							<div className="flex gap-4 items-center">
								<Avatar className="w-11 h-11">
									<AvatarFallback>
										{full_name ? full_name.substring(0, 2) : ""}
									</AvatarFallback>
								</Avatar>
								<h4 className="text-base font-semibold">{`${full_name} - ${job_title}`}</h4>
								<div className="flex gap-1 ml-auto">
									{selectedCommentId === id ? (
										<>
											<Button
												variant="ghost"
												className="px-2"
												onClick={dispatchUpdateComment}
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
												onClick={() => toggleEditMode(id, content)}
											>
												<Pen size={18} className="text-gray-500" />
											</Button>
											<Button
												variant="ghost"
												size="icon"
												className="px-2"
												onClick={() => dispatchDeleteComment(id)}
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
										value={updatedContent}
										onChange={(e) => {
											handleContentChange(e);
										}}
									/>
								) : content ? (
									content
								) : (
									""
								)}
							</div>
						</div>
					</div>
				)
			)}

			<div className="flex gap-6 min-h-16">
				<div className="flex flex-col items-center w-[50px]">
					<Separator orientation="vertical" className="bg-gray-300 w-[2px] flex-1" />
					<span className="border-2 border-gray-300 rounded-full p-px h-fit w-fit">
						<Dot size={20} className="text-gray-600" />
					</span>
					<Separator
						orientation="vertical"
						className="w-[2px] flex-1 bg-transparent"
					/>
				</div>
				<div className="flex items-center px-1">
					<p className="text-gray-700">
						{`${letter.owner.full_name} ይህን ደብዳቤ 
            ${convertToEthiopianDate(letter.created_at)} ፈጥረዋል።`}
					</p>
				</div>
			</div>
		</section>
	) : null;
}
