"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
	handleContentChange,
	selectNewLetter,
} from "@/lib/features/letterSlice";
import CharacterCount from "@tiptap/extension-character-count";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
	const { content } = useAppSelector(selectNewLetter);
	const dispatch = useAppDispatch();
	const limit = 1000;

	const editorEditable = useEditor({
		editable: true,
		content: content,
		extensions: [
			StarterKit,
			CharacterCount.configure({
				limit,
			}),
		],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					"max-w-[210mm] min-h-[20mm] max-h-[322px] mx-auto bg-white border border-gray-300",
			},
		},
		onUpdate: ({ editor }) => dispatch(handleContentChange(editor.getHTML())),
	});

	return (
		<section>
			<EditorContent
				style={{ whiteSpace: "pre-line" }}
				editor={editorEditable}
				className="editor"
			/>
		</section>
	);
}
