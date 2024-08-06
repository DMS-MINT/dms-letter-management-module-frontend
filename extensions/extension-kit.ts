"use client";

import {
	BlockquoteFigure,
	CharacterCount,
	Color,
	Document,
	Dropcursor,
	FontSize,
	Heading,
	Highlight,
	HorizontalRule,
	Link,
	Placeholder,
	StarterKit,
	TaskItem,
	TaskList,
	TextAlign,
	TextStyle,
	Underline,
} from ".";

export const ExtensionKit = () => [
	Document,
	TaskList,
	TaskItem.configure({
		nested: true,
	}),
	// Selection,
	Heading.configure({
		levels: [1, 2, 3, 4, 5, 6],
	}),
	HorizontalRule,
	StarterKit.configure({
		document: false,
		dropcursor: false,
		heading: false,
		horizontalRule: false,
		blockquote: false,
		history: false,
		codeBlock: false,
	}),
	TextStyle,
	FontSize,
	Color,
	Link.configure({
		openOnClick: false,
	}),
	Highlight.configure({ multicolor: true }),
	Underline,
	CharacterCount.configure({ limit: 50000 }),
	TextAlign.extend({
		addKeyboardShortcuts() {
			return {};
		},
	}).configure({
		types: ["heading", "paragraph"],
	}),
	Placeholder.configure({
		includeChildren: true,
		showOnlyCurrent: false,
		placeholder: () => "ደብዳቤዎን እዚህ ይፃፉ...",
	}),
	BlockquoteFigure,
	Dropcursor.configure({
		width: 2,
		class: "ProseMirror-dropcursor border-black",
	}),
];
