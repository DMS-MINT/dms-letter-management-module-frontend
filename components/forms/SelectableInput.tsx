"use client";

import { useReactSelect } from "@/hooks/";
import { useParticipantStore, useUiStore } from "@/stores";
import type { RoleEnum } from "@/types/letter_module";
import type { GuestType, MemberType } from "@/types/user_module";
import ReactSelect, {
	components,
	type IndicatorsContainerProps,
	type MultiValueGenericProps,
	type MultiValueRemoveProps,
} from "react-select";

interface ISelectableInputProps {
	name: RoleEnum;
	placeholder: string;
	isClearable: boolean;
	orientation: "vertical" | "horizontal";
	prefix: string;
}

export default function SelectableInput({
	name,
	placeholder,
	isClearable,
	orientation,
	prefix,
}: ISelectableInputProps) {
	const isLetterReadOnly = useUiStore((state) => state.isLetterReadOnly);
	const participants = useParticipantStore((state) => state.participants);
	const { users, handleMultiSelectChange, getLabel, getValue, getDefaultValue } =
		useReactSelect();

	const MultiValueLabel = (
		props: MultiValueGenericProps<MemberType | GuestType>
	) => {
		return (
			<div className="flex items-center text-lg text-black">
				<span>{prefix}</span>
				<components.MultiValueLabel {...props} />
			</div>
		);
	};

	const IndicatorsContainer = (
		_props: IndicatorsContainerProps<MemberType | GuestType, true>
	) => {
		return <></>;
	};

	const MultiValueRemove = (
		props: MultiValueRemoveProps<MemberType | GuestType>
	) => {
		return isLetterReadOnly ? (
			<></>
		) : (
			<components.MultiValueRemove {...props}></components.MultiValueRemove>
		);
	};

	return (
		<ReactSelect
			isMulti
			isClearable={isClearable}
			name={name}
			isDisabled={isLetterReadOnly}
			onChange={handleMultiSelectChange}
			components={{ MultiValueLabel, IndicatorsContainer, MultiValueRemove }}
			options={users}
			value={getDefaultValue(name)}
			placeholder={placeholder}
			getOptionLabel={getLabel}
			getOptionValue={getValue}
			className="w-full"
			classNamePrefix={orientation}
			isOptionDisabled={(option) =>
				participants.some((participant) => participant.user.id === option.id)
			}
		/>
	);
}
