import { ExtensionKit } from "@/extensions/extension-kit";
import type { ContentStoreActions, LetterContentStoreType } from "@/lib/stores";
import { useEditor, type AnyExtension } from "@tiptap/react";

export interface BlockEditorHookProps {
	editable: boolean;
	body: LetterContentStoreType["body"];
	updateLetterField: ContentStoreActions["updateLetterField"];
}

export default function useBlockEditor({
	editable,
	body,
	updateLetterField,
}: BlockEditorHookProps) {
	const handleUpdate = (value: string) => {
		updateLetterField("body", value);
	};

	const editor = useEditor({
		editable: editable,
		extensions: [...ExtensionKit()] as AnyExtension[],
		content: body,
		immediatelyRender: false,
		onUpdate: ({ editor }) => handleUpdate(editor.getHTML()),
	});

	return { editor };
}
