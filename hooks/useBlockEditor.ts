import { ExtensionKit } from "@/extensions/extension-kit";
import { useLetterStore } from "@/stores";
import { useEditor, type AnyExtension } from "@tiptap/react";

export interface BlockEditorHookProps {
	editable: boolean;
}

export default function useBlockEditor({ editable }: BlockEditorHookProps) {
	const { content, updateLetterField } = useLetterStore((state) => ({
		content: state.content,
		updateLetterField: state.updateLetterField,
	}));

	const handleUpdate = (value: string) => {
		updateLetterField("content", value);
	};

	const editor = useEditor({
		editable: editable,
		extensions: [...ExtensionKit()] as AnyExtension[],
		content: content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => handleUpdate(editor.getHTML()),
	});

	return { editor };
}
