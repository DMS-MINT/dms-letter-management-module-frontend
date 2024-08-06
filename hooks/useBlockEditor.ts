import { ExtensionKit } from "@/extensions/extension-kit";
import { useLetterStore, useUiStore } from "@/stores";
import { useEditor, type AnyExtension } from "@tiptap/react";
import { useEffect } from "react";

export default function useBlockEditor() {
	const { content, updateLetterField } = useLetterStore((state) => ({
		content: state.content,
		updateLetterField: state.updateLetterField,
	}));

	const { isLetterReadOnly } = useUiStore((state) => ({
		isLetterReadOnly: state.isLetterReadOnly,
	}));

	const handleUpdate = (value: string) => {
		updateLetterField("content", value);
	};

	const editor = useEditor({
		editable: true,
		extensions: [...ExtensionKit()] as AnyExtension[],
		content: content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => handleUpdate(editor.getHTML()),
	});

	useEffect(() => {
		if (editor) {
			editor.setEditable(!isLetterReadOnly);
		}
	}, [editor, isLetterReadOnly]);

	return { editor };
}
