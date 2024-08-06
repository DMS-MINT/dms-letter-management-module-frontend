import { isTextSelection } from "@tiptap/core";
import type { Editor } from "@tiptap/react";

export default function isTextSelected({ editor }: { editor: Editor }) {
	const {
		state: {
			doc,
			selection,
			selection: { empty, from, to },
		},
	} = editor;

	// Sometime check for `empty` is not enough.
	// Double click an empty paragraph returns a node size of 2.
	// So we check also for an empty text size.
	const isEmptyTextBlock =
		!doc.textBetween(from, to).length && isTextSelection(selection);

	if (empty || isEmptyTextBlock || !editor.isEditable) {
		return false;
	}

	return true;
}
