"use client";

import HeaderNode from "@/components/editor/Header";
import { mentionSuggestionOptions } from "@/components/editor/suggestions";
import Mention from "@tiptap/extension-mention";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
	const editor = useEditor({
		autofocus: true,
		immediatelyRender: false,
		extensions: [
			StarterKit,
			Mention.configure({
				HTMLAttributes: {
					class: "mention",
				},
				suggestion: mentionSuggestionOptions,
			}),
			HeaderNode,
		],
		content: `<react-component count="0"></react-component>`,
		editorProps: {
			attributes: {
				class:
					"prose dark:prose-invert prose-xs mx-auto focus:outline-none min-w-[8.5in] max-w-[8.5in] min-h-[11in] max-h-[11in] bg-white border border-gray-300 p-[10mm]",
			},
		},
	});

	return (
		<section className="py- flex flex-1 justify-center bg-halftone-pattern py-10">
			<EditorContent editor={editor} />
		</section>
	);
}
