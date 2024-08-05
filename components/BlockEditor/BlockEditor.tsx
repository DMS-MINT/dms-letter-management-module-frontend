"use client";

import useBlockEditor from "@/hooks/useBlockEditor";
import "@/styles/index.css";
import { EditorContent } from "@tiptap/react";

export default function BlockEditor() {
	const { editor } = useBlockEditor();

	if (!editor) return;

	return (
		<section className="mb-10 mt-5 w-full">
			<EditorContent editor={editor} />
		</section>
	);
}
