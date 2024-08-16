import type { ShouldShowProps } from "@/components/BlockEditor/menus/types";
import { isTextSelected } from "@/lib/utils/isTextSelected";
import type { Editor } from "@tiptap/react";
import { useCallback } from "react";

export default function useTextMenuStates(editor: Editor) {
	const shouldShow = useCallback(
		({ view }: ShouldShowProps) => {
			if (!view) {
				return false;
			}

			return isTextSelected({ editor });
		},
		[editor]
	);

	return {
		isBold: editor.isActive("bold"),
		isItalic: editor.isActive("italic"),
		isStrike: editor.isActive("strike"),
		isUnderline: editor.isActive("underline"),
		isCode: editor.isActive("code"),
		isSubscript: editor.isActive("subscript"),
		isSuperscript: editor.isActive("superscript"),
		isAlignLeft: editor.isActive({ textAlign: "left" }),
		isAlignCenter: editor.isActive({ textAlign: "center" }),
		isAlignRight: editor.isActive({ textAlign: "right" }),
		isAlignJustify: editor.isActive({ textAlign: "justify" }),
		currentColor: editor.getAttributes("textStyle")?.color || undefined,
		currentHighlight: editor.getAttributes("highlight")?.color || undefined,
		currentFont: editor.getAttributes("textStyle")?.fontFamily || undefined,
		currentSize: editor.getAttributes("textStyle")?.fontSize || undefined,
		shouldShow,
	};
}
