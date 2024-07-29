import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useImperativeHandle, useState } from "react";

import type { GuestType, MemberType } from "@/types/user_module";
import clsx from "clsx";

export type SuggestionListRef = {
	onKeyDown: NonNullable<
		ReturnType<
			NonNullable<SuggestionOptions<MemberType | GuestType>["render"]>
		>["onKeyDown"]
	>;
};

export type SuggestionListProps = SuggestionProps<MemberType | GuestType>;

const SuggestionList = forwardRef<SuggestionListRef, SuggestionListProps>(
	(props, ref) => {
		// eslint-disable-next-line no-unused-vars
		const [selectedUserId, setSelectedUserId] = useState<string>("");

		const selectItem = (user_id: string) => {
			let mentionItem: MemberType | GuestType;
			const suggestion = props.items.filter((user) => user.id === user_id)[0];

			console.log(suggestion);

			if (suggestion.user_type === "member") {
				mentionItem = {
					id: suggestion.id,
					full_name: suggestion.full_name,
					job_title: suggestion.job_title,
					user_type: "member",
				} as MemberType;
			} else {
				mentionItem = {
					id: suggestion.id,
					name: suggestion.name,
					user_type: "guest",
				} as GuestType;
			}

			if (mentionItem.user_type === "member") {
				props.command({
					id: mentionItem.id,
					label: mentionItem.full_name,
				});
			} else {
				props.command({
					id: mentionItem.id,
					label: mentionItem.name,
				});
			}
		};

		const upHandler = () => {
			console.log("HANDLE UP");
		};

		const downHandler = () => {
			console.log("HANDLE DOWN");
		};

		const enterHandler = () => {
			selectItem(selectedUserId);
		};

		useImperativeHandle(ref, () => ({
			onKeyDown: ({ event }) => {
				if (event.key === "ArrowUp") {
					upHandler();
					return true;
				}

				if (event.key === "ArrowDown") {
					downHandler();
					return true;
				}

				if (event.key === "Enter") {
					enterHandler();
					return true;
				}

				return false;
			},
		}));

		return props.items.length > 0 ? (
			<div className="relative flex flex-col gap-0.5 overflow-auto rounded-lg border border-gray-100 bg-white p-2 shadow-lg">
				{props.items.length
					? props.items.map((item) => (
							<button
								className={clsx(
									"flex w-full items-center gap-1 bg-transparent text-left",
									{
										"hover:bg-gray-300": selectedUserId === item.id,
										"hover:bg-gray-200": selectedUserId !== item.id,
									}
								)}
								key={item.id}
								onClick={() => selectItem(item.id)}
							>
								{item.user_type === "member" ? (
									<>
										{item.full_name} - {item.job_title}
									</>
								) : (
									<>{item.name}</>
								)}
							</button>
						))
					: null}
			</div>
		) : null;
	}
);

SuggestionList.displayName = "SuggestionList";

export default SuggestionList;
