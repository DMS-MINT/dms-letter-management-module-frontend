import type { GuestType, MemberType } from "@/types/user_module";
import type { MentionOptions } from "@tiptap/extension-mention";
import { ReactRenderer } from "@tiptap/react";
import tippy, { type Instance as TippyInstance } from "tippy.js";
import * as uuidv4 from "uuid";
import SuggestionList, { type SuggestionListRef } from "./SuggestionList";

const data: MemberType[] | GuestType[] = [
	{
		id: uuidv4.v4(),
		full_name: "Lea Thompson",
		job_title: "Software Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Cyndi Lauper",
		job_title: "Data Scientist",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Tom Cruise",
		job_title: "AI Specialist",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Madonna",
		job_title: "Cloud Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Jerry Hall",
		job_title: "DevOps Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Joan Collins",
		job_title: "Cybersecurity Analyst",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Winona Ryder",
		job_title: "Full Stack Developer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Christina Applegate",
		job_title: "Product Manager",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Alyssa Milano",
		job_title: "System Administrator",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Molly Ringwald",
		job_title: "UX/UI Designer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Ally Sheedy",
		job_title: "Network Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Debbie Harry",
		job_title: "IT Support Specialist",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Olivia Newton-John",
		job_title: "QA Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Elton John",
		job_title: "Technical Writer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Michael J. Fox",
		job_title: "Blockchain Developer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Axl Rose",
		job_title: "IoT Specialist",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Emilio Estevez",
		job_title: "Data Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Ralph Macchio",
		job_title: "Mobile App Developer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Rob Lowe",
		job_title: "Web Developer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Jennifer Grey",
		job_title: "IT Project Manager",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Mickey Rourke",
		job_title: "Solutions Architect",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "John Cusack",
		job_title: "AI Research Scientist",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Matthew Broderick",
		job_title: "Database Administrator",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Justine Bateman",
		job_title: "Machine Learning Engineer",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Lisa Bonet",
		job_title: "Enterprise Architect",
		user_type: "member",
	},
	{
		id: uuidv4.v4(),
		full_name: "Benicio Monserrate Rafael del Toro Sánchez",
		job_title: "Chief Technology Officer",
		user_type: "member",
	},
];

const DOM_RECT_FALLBACK: DOMRect = {
	bottom: 0,
	height: 0,
	left: 0,
	right: 0,
	top: 0,
	width: 0,
	x: 0,
	y: 0,
	toJSON() {
		return {};
	},
};

export const mentionSuggestionOptions: MentionOptions["suggestion"] = {
	items: ({ query }): (MemberType | GuestType)[] => {
		return data
			.filter((user) =>
				user.full_name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
			)
			.slice(0, 5);
	},
	render: () => {
		let component: ReactRenderer<SuggestionListRef> | undefined;
		let popup: TippyInstance | undefined;

		return {
			onStart: (props) => {
				component = new ReactRenderer(SuggestionList, {
					props,
					editor: props.editor,
				});

				popup = tippy("body", {
					getReferenceClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK,
					appendTo: () => document.body,
					content: component.element,
					showOnCreate: true,
					interactive: true,
					trigger: "manual",
					placement: "bottom-start",
				})[0];
			},

			onUpdate(props) {
				component?.updateProps(props);

				popup?.setProps({
					getReferenceClientRect: () => props.clientRect?.() ?? DOM_RECT_FALLBACK,
				});
			},

			onKeyDown(props) {
				if (props.event.key === "Escape") {
					popup?.hide();
					return true;
				}

				if (!component?.ref) {
					return false;
				}

				return component.ref.onKeyDown(props);
			},

			onExit() {
				popup?.destroy();
				component?.destroy();
				popup = undefined;
				component = undefined;
			},
		};
	},
};
