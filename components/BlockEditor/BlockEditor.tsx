"use client";

import useBlockEditor from "@/hooks/useBlockEditor";
import { useUiStore } from "@/stores";
import "@/styles/index.css";
import { EditorContent } from "@tiptap/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { TextMenu } from "./menus/TextMenu";

export default function BlockEditor() {
	const pathname = usePathname();
	const { isLetterReadOnly, setLetterReadOnly } = useUiStore((state) => ({
		isLetterReadOnly: state.isLetterReadOnly,
		setLetterReadOnly: state.setLetterReadOnly,
	}));
	const { editor } = useBlockEditor({ editable: !isLetterReadOnly });

	const resetEditorContent = useCallback(() => {
		if (editor && pathname === "/letters/compose") {
			editor.commands.clearContent(true);
			setLetterReadOnly(false);
		}
	}, [editor, pathname, setLetterReadOnly]);

	useEffect(() => {
		resetEditorContent();
	}, [resetEditorContent]);

	if (!editor) return null;

	return (
		<section className="mb-10 mt-5 w-full">
			<EditorContent editor={editor} />
			<TextMenu editor={editor} />
		</section>
	);
}
