"use client";

import {
	useParticipantSelector,
	type ParticipantSelectorActions,
} from "@/hooks";
import {
	actionDispatcher,
	getLabel,
	getValue,
	isContactType,
	isEnterpriseType,
	isOptionDisabled,
	isUserType,
	type OptionType,
	type ParticipantScopeType,
} from "@/lib/utils/participantUtils";
import type { ParticipantDetailType } from "@/types/letter_module";
import { LanguageEnum } from "@/types/shared";
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
	type OptionProps,
	type Props as ReactSelectProps,
} from "react-select";
import { toast } from "sonner";
import { OptionItem } from "../buttons";

type Props = ParticipantSelectorActions & {
	prefix: string;
	language: LanguageEnum;
	participants: ParticipantDetailType[];
	participantScope: ParticipantScopeType;
} & ReactSelectProps<UserType | EnterpriseType | ContactType, true>;

function ParticipantSelector({
	prefix,
	language,
	participants,
	participantScope,
	addParticipant,
	removeParticipant,
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
		staleTime: Infinity,
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

	const Option = (props: OptionProps<OptionType>) => {
		const { data } = props;

		return (
			<div>
				<components.Option {...props} className="!p-1">
					{isUserType(data) ? (
						<OptionItem
							primaryText={
								language === LanguageEnum.English
									? data.user_profile.job_title.title_en
									: data.user_profile.job_title.title_am
							}
							secondaryText={
								language === LanguageEnum.English
									? data.user_profile.full_name_en
									: data.user_profile.full_name_am
							}
						/>
					) : null}
					{isEnterpriseType(data) ? (
						<OptionItem
							imageSrc={data.logo}
							primaryText={
								language === LanguageEnum.English ? data.name_en : data.name_am
							}
							secondaryText={
								language === LanguageEnum.English
									? data.address.city_en
									: data.address.city_am
							}
						/>
					) : null}
					{isContactType(data) ? (
						<OptionItem
							primaryText={
								language === LanguageEnum.English
									? data.full_name_en
									: data.full_name_am
							}
							secondaryText={
								language === LanguageEnum.English
									? data.address.city_en
									: data.address.city_en
							}
						/>
					) : null}
				</components.Option>
			</div>
		);
	};

	return (
		<ReactSelect
			isMulti
			isClearable={true}
			isDisabled={isDisabled}
			options={options}
			getOptionLabel={(option) => getLabel(option, language)}
			getOptionValue={(option) => getValue(option, language)}
			onChange={handleMultiSelectChange}
			className="w-full"
			classNamePrefix="participant_selector"
			components={{
				MultiValueLabel,
				IndicatorsContainer,
				MultiValueRemove,
				Option,
			}}
			isOptionDisabled={(option) => isOptionDisabled(option, participants)}
			{...reactSelectProps}
		/>
	);
}

export default memo(ParticipantSelector);
