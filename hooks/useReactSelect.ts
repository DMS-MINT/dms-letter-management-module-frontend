"use client";

import { getAllUsers } from "@/actions/user_module/action";
import type { RoleEnum } from "@/types/letter_module";
import type { MemberType, GuestType } from "@/types/user_module";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActionMeta } from "react-select";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "./reduxHooks";
import { addParticipant } from "@/lib/features/letterSlice";

export type ReactSelectPropType = {
	isMulti: boolean;
};

export default function useReactSelect({ isMulti }: ReactSelectPropType) {
	const dispatch = useAppDispatch();
	type OptionType = MemberType | GuestType;

	const {
		mutate,
		data: users,
		isSuccess,
	} = useMutation({
		mutationKey: ["getAllUsers"],
		mutationFn: async () => {
			const response = await getAllUsers();

			if (!response.ok) throw response;

			return response.message as OptionType[];
		},
		onError: (error: any) => {
			toast.dismiss();
			toast.error(error.message);
		},
	});

	useEffect(() => {
		mutate();
	}, []);

	const handleSingleSelectChange = (
		option: OptionType | null,
		actionMeta: ActionMeta<OptionType>
	) => {
		const { action, name } = actionMeta;
		const role = name as RoleEnum;

		const handleSelectOption = (option: OptionType) => {
			dispatch(addParticipant({ id: uuidv4(), user: option, role }));
		};

		switch (action) {
			case "select-option":
				if (option) handleSelectOption(option);
				break;
			case "clear":
				// handleClear();
				break;
			default:
				break;
		}
	};

	const handleMultiSelectChange = (
		option: readonly OptionType[],
		actionMeta: ActionMeta<OptionType>
	) => {
		const {
			action,
			name,
			removedValues,
			option: selectedOption,
			removedValue,
		} = actionMeta;
		const role = name as RoleEnum;

		const handleSelectOption = (selectedOption: OptionType) => {
			// dispatch(addParticipant({ id: uuidv4(), user: selectedOption, role }));
		};

		const handleCreateOption = (selectedOption: OptionType) => {
			const { value } = selectedOption as unknown as { value: string };
			const user_type = "guest";
			// dispatch(
			// 	addParticipant({
			// 		id: uuidv4(),
			// 		user: { id: value, name: value, user_type },
			// 		role,
			// 	})
			// );
		};

		const handleRemoveValue = (removedValue: OptionType) => {
			const user_id = removedValue.id;

			if (user_id) {
				// dispatch(removeParticipant(user_id));
			} else {
				const { value } = removedValue as unknown as { value: string };
				// dispatch(removeParticipant(value));
			}
		};

		const handleClear = (removedValues: OptionType[]) => {
			removedValues.forEach((removedValue) => {
				const user_id = removedValue.id;

				// if (user_id) {
				// 	dispatch(removeParticipant(user_id));
				// } else {
				// 	const { value } = removedValue as unknown as { value: string };
				// 	dispatch(removeParticipant(value));
				// }
			});
		};

		switch (action) {
			case "select-option":
				if (selectedOption) handleSelectOption(selectedOption);
				break;
			case "create-option":
				if (selectedOption) handleCreateOption(selectedOption);
				break;
			case "remove-value":
				if (removedValue) handleRemoveValue(removedValue);
				break;
			case "clear":
				if (removedValues) handleClear(removedValues as OptionType[]);
				break;
			default:
				break;
		}
	};

	const isOptionType = (
		option: OptionType | { label: string; value: string }
	): option is OptionType => {
		return (option as OptionType).user_type !== undefined;
	};

	const getLabel = (
		option: OptionType | { label: string; value: string }
	): string => {
		if (isOptionType(option)) {
			if (option.user_type === "member") {
				return `${option.full_name} - ${option.job_title}`;
			} else if (option.user_type === "guest") {
				return `${option.name}`;
			}
		}
		return `${option.label}`;
	};

	const getValue = (
		option: OptionType | { label: string; value: string }
	): string => {
		if (isOptionType(option)) {
			if (option.user_type === "member") {
				return option.id;
			} else if (option.user_type === "guest") {
				return option.name;
			}
		}
		return `${option.value}`;
	};

	return {
		users,
		getValue,
		getLabel,
		isSuccess,
		handleSingleSelectChange,
		handleMultiSelectChange,
	};
}
