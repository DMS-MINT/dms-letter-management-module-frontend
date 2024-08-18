"use client";

import "@/styles/index.css";
import { EditorContent, type Editor } from "@tiptap/react";
import { TextMenu } from "./menus/TextMenu";

export default function BlockEditor({ editor }: { editor: Editor }) {
	return (
		<section className="mb-10 mt-5 w-full">
			<EditorContent editor={editor} />
			<TextMenu editor={editor} />
		</section>
	);
}
