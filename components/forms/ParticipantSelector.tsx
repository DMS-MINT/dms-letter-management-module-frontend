"use client";

import {
	useParticipantSelector,
	type ParticipantSelectorActions,
} from "@/hooks";
import {
	actionDispatcher,
	getLabel,
	getValue,
	isOptionDisabled,
	type OptionType,
	type ParticipantScopeType,
} from "@/lib/utils/participantUtils";
import type { ParticipantDetailType } from "@/types/letter_module";
import type {
	ContactType,
	EnterpriseType,
	UserType,
} from "@/types/user_module";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import ReactSelect, {
	components,
	type IndicatorsContainerProps,
	type MultiValueGenericProps,
	type MultiValueRemoveProps,
	type Props as ReactSelectProps,
} from "react-select";
import { toast } from "sonner";

type Props = ParticipantSelectorActions & {
	prefix: string;
	participants: ParticipantDetailType[];
	participantScope: ParticipantScopeType;
} & ReactSelectProps<UserType | EnterpriseType | ContactType, true>;

function ParticipantSelector({
	prefix,
	addParticipant,
	removeParticipant,
	participantScope,
	participants,
	isDisabled,
	...reactSelectProps
}: Props) {
	const { data: options } = useQuery({
		queryKey: ["users", { participantScope }],
		queryFn: async () => {
			try {
				const response = await actionDispatcher(participantScope);
				return response;
			} catch (error: any) {
				toast.dismiss();
				toast.error(error.message);
			}
		},
	});

	const { handleMultiSelectChange } = useParticipantSelector({
		addParticipant,
		removeParticipant,
	});

	const MultiValueLabel = (props: MultiValueGenericProps<OptionType>) => {
		return (
			<div className="flex items-center text-lg text-black">
				<span>{prefix}</span>
				<components.MultiValueLabel {...props} />
			</div>
		);
	};

	const IndicatorsContainer = (
		_props: IndicatorsContainerProps<OptionType, true>
	) => {
		return <></>;
	};

	const MultiValueRemove = (props: MultiValueRemoveProps<OptionType>) => {
		return isDisabled ? (
			<></>
		) : (
			<components.MultiValueRemove {...props}></components.MultiValueRemove>
		);
	};

	return (
		<ReactSelect
			isMulti
			isClearable={true}
			isDisabled={isDisabled}
			options={options}
			getOptionLabel={getLabel}
			getOptionValue={getValue}
			onChange={handleMultiSelectChange}
			className="w-full"
			classNamePrefix="participant_selector"
			components={{ MultiValueLabel, IndicatorsContainer, MultiValueRemove }}
			isOptionDisabled={(option) => isOptionDisabled(option, participants)}
			{...reactSelectProps}
		/>
	);
}

export default memo(ParticipantSelector);
