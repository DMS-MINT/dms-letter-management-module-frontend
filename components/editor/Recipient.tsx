// extensions/Recipient.ts
import { Node, mergeAttributes } from "@tiptap/core";

const Recipient = Node.create({
	name: "recipient",

	group: "block",

	content: "inline*", // Allow inline content such as text and other inline nodes

	addAttributes() {
		return {
			placeholder: {
				default: "Select recipient...",
			},
		};
	},

	parseHTML() {
		return [
			{
				tag: "recipient",
				getAttrs: (node) => ({
					placeholder: node.getAttribute("placeholder"),
				}),
			},
		];
	},

	renderHTML({ HTMLAttributes }) {
		return ["recipient", mergeAttributes(HTMLAttributes), 0];
	},
});

export default Recipient;
