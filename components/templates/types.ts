import type { ParticipantSelectorActions } from "@/hooks";
import type { ContentStoreActions, LetterContentStoreType } from "@/lib/stores";
import type { ParticipantDetailType } from "@/types/letter_module";
import type { Editor } from "@tiptap/react";

export type TemplateProps = ParticipantSelectorActions & {
	editor: Editor;
	subject: LetterContentStoreType["subject"];
	reference_number: LetterContentStoreType["reference_number"];
	published_at: LetterContentStoreType["published_at"];
	participants: ParticipantDetailType[];
	isLetterReadOnly: boolean;
	updateLetterField: ContentStoreActions["updateLetterField"];
};
