"use client";

import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAttachmentRevisionStore } from "@/lib/stores";
import type { LetterDetailType } from "@/types/letter_module";
import { letterTypeTranslations } from "@/types/letter_module";
import {
	FileDigit,
	Languages,
	Mail,
	MessageSquareText,
	Paperclip,
} from "lucide-react";
import React, { Fragment, memo, useMemo } from "react";
import { FileUploadDialog } from "../dialogs";

interface ILetterMetaData {
	label: string;
	value: string;
	icon: React.JSX.Element;
}

function LetterDetailsDrawer({
	letter: {
		language,
		letter_type,
		reference_number,
		reference_number_am,
		comments,
		letter_attachments,
		current_state,
	},
	editable,
}: {
	letter: LetterDetailType;
	editable: boolean;
}) {
	const {
		newAttachments,
		removedAttachmentsIds,
		addNewAttachment,
		removeNewAttachment,
		restoreUploadedAttachment,
		removeUploadedAttachment,
	} = useAttachmentRevisionStore();

	const letterMeta: ILetterMetaData[] = useMemo(() => {
		return [
			{
				label: "የደብዳቤ አይነት",
				value: letterTypeTranslations[letter_type.toUpperCase()],
				icon: <Mail size={20} className="text-gray-600" />,
			},
			{
				label: "የመዝገብ ቁጥር",
				value:
					current_state === "Published"
						? language === "English"
							? reference_number
							: reference_number_am
						: " ",
				icon: <FileDigit size={20} className="text-gray-600" />,
			},
			{
				label: "ቋንቋ",
				value: language,
				icon: <Languages size={20} className="text-gray-600" />,
			},
		];
	}, [
		language,
		reference_number,
		reference_number_am,
		letter_type,
		current_state,
	]);

	return (
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-2">
				{letterMeta.map(({ label, value, icon }) => (
					<Fragment key={label}>
						<div className="flex items-center gap-2">
							{icon}
							<p className="text-gray-600">{label}</p>
						</div>
						<Badge className="mb-2 h-10 rounded-sm bg-gray-200 text-base font-normal text-gray-900">
							{value}
						</Badge>
					</Fragment>
				))}
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
				<FileUploadDialog
					editable={editable}
					uploadedAttachments={letter_attachments}
					newAttachments={newAttachments}
					removedAttachmentsIds={removedAttachmentsIds}
					addNewAttachment={addNewAttachment}
					removeNewAttachment={removeNewAttachment}
					restoreUploadedAttachment={restoreUploadedAttachment}
					removeUploadedAttachment={removeUploadedAttachment}
				/>
			</div>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<div className="flex flex-col gap-5">
							<a className="flex w-fit items-center gap-2" href="#comment_section">
								<MessageSquareText size={20} className="text-gray-600" />
								<p className="text-gray-600">{comments.length}</p>
							</a>
						</div>
					</TooltipTrigger>
					<TooltipContent>አስተያየት</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</section>
	);
}

export default memo(LetterDetailsDrawer);
