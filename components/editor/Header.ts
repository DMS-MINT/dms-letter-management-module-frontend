// extensions/HeaderNode.ts
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import HeaderNodeView from "./HeaderView";

const HeaderNode = Node.create({
	name: "headerNode",
	group: "block",
	atomic: true,

	addAttributes() {
		return {
			count: {
				default: 0,
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "react-component",
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["react-component", mergeAttributes(HTMLAttributes)];
	},

	addNodeView() {
		return ReactNodeViewRenderer(HeaderNodeView);
	},
});

export default HeaderNode;
