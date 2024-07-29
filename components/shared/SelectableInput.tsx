"use client";

import { useReactSelect } from "@/hooks/";
import ReactSelect from "react-select";

interface ISelectableInputProps {
	name: string;
}

export default function SelectableInput({ name }: ISelectableInputProps) {
	const { users, handleSingleSelectChange, getLabel, getValue } = useReactSelect(
		{
			isMulti: false,
		}
	);

	return (
		<ReactSelect
			id="THIS IS THE ID"
			name={name}
			onChange={handleSingleSelectChange}
			options={users}
			placeholder="ይምረጡ..."
			getOptionLabel={getLabel}
			getOptionValue={getValue}
			className="w-full"
		/>
	);
}
