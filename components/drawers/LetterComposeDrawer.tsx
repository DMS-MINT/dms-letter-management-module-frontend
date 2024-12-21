"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	useDraftAttachmentStore,
	useDraftLetterStore,
	useUserStore,
} from "@/lib/stores";
import { LanguageEnum } from "@/types/shared";
import { Languages, Mail, Paperclip } from "lucide-react";
import { useEffect } from "react";
import { FileUploadDialog } from "../dialogs";

export default function LetterComposeDrawer() {
	const is_staff = useUserStore(
		(state) => state.currentUser.users_permissions.is_staff
	);
	const {
		updateLetterField,
		letter_type,
		language,
		resetContent,
		resetParticipants,
	} = useDraftLetterStore((state) => ({
		letter_type: state.letter_type,
		language: state.language,
		updateLetterField: state.updateLetterField,
		resetContent: state.resetContent,
		resetParticipants: state.resetParticipants,
	}));
	const {
		newAttachments,
		removedAttachmentsIds,
		addNewAttachment,
		removeNewAttachment,
		restoreUploadedAttachment,
		removeUploadedAttachment,
		resetAttachmentStore,
	} = useDraftAttachmentStore();

	useEffect(() => {
		resetContent();
		resetParticipants();
		resetAttachmentStore();
	}, [resetAttachmentStore, resetContent, resetParticipants]);

	const handleLetterCategoryChange = (type: string): void => {
		updateLetterField("letter_type", type);
	};

	const handleLanguageChange = (type: LanguageEnum): void => {
		updateLetterField("language", type);
	};

	return (
		<section className="flex flex-col gap-10">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Mail size={20} className="text-gray-600" />
					<p className="text-gray-600">የደብዳቤ ዓይነት</p>
				</div>
				<Select value={letter_type} onValueChange={handleLetterCategoryChange}>
					<SelectTrigger>
						<SelectValue placeholder="የደብዳቤ ዓይነት ይምረጡ" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="internal" className="pr-2">
								የውስጥ ደብዳቤ
							</SelectItem>
							<SelectItem value="outgoing" className="pr-2">
								ወደ ውጪ የሚላክ
							</SelectItem>
							{is_staff ? (
								<SelectItem value="incoming" className="pr-2">
									ከውጭ የተላከ
								</SelectItem>
							) : null}
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className="flex items-center gap-2">
					<Languages size={20} className="text-gray-600" />
					<p className="text-gray-600">ቋንቋ ይምረጡ</p>
				</div>
				<Select value={language} onValueChange={handleLanguageChange}>
					<SelectTrigger>
						<SelectValue placeholder="ቋንቋ ይምረጡ" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{Object.entries(LanguageEnum).map(([key, value]) => (
								<SelectItem key={key} value={value} className="pr-2">
									{key}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<div className="flex items-center gap-2">
					<Paperclip size={20} className="text-gray-600" />
					<p className="text-gray-600">የተያያዙ ፋይሎች</p>
				</div>
				<FileUploadDialog
					editable={true}
					newAttachments={newAttachments}
					removedAttachmentsIds={removedAttachmentsIds}
					addNewAttachment={addNewAttachment}
					removeNewAttachment={removeNewAttachment}
					restoreUploadedAttachment={restoreUploadedAttachment}
					removeUploadedAttachment={removeUploadedAttachment}
				/>
			</div>
		</section>
	);
}
