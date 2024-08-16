import {
	getIdOrValue,
	handleCreateParticipant,
	participantSerializer,
	type OptionType,
} from "@/lib/utils/participantUtils";
import type { ParticipantDetailType, RoleEnum } from "@/types/letter_module";
import type { ActionMeta } from "react-select";

export type ParticipantSelectorActions = {
	addParticipant: (_participant: ParticipantDetailType) => void;
	removeParticipant: (_user_id: string) => void;
};

export default function useParticipantSelector({
	addParticipant,
	removeParticipant,
}: ParticipantSelectorActions) {
	const handleSingleSelectChange = (
		option: OptionType,
		actionMeta: ActionMeta<OptionType>
	) => {
		const { action, name: role } = actionMeta;

		switch (action) {
			case "select-option": {
				const participant = participantSerializer(option, role as RoleEnum);
				addParticipant(participant);
				break;
			}
			case "clear": {
				break;
			}
			default:
				break;
		}
	};

	const handleMultiSelectChange = (
		options: readonly OptionType[],
		actionMeta: ActionMeta<OptionType>
	) => {
		const {
			action,
			name: role,
			option,
			removedValue,
			removedValues,
		} = actionMeta;

		switch (action) {
			case "select-option": {
				if (!option) break;
				const participant = participantSerializer(option, role as RoleEnum);
				addParticipant(participant);
				break;
			}
			case "create-option": {
				const participant = handleCreateParticipant(option, role as RoleEnum);
				addParticipant(participant);
				break;
			}
			case "remove-value": {
				const id = getIdOrValue(removedValue);
				removeParticipant(id);
				break;
			}
			case "clear": {
				removedValues.forEach((removedValue) => {
					const id = getIdOrValue(removedValue);
					removeParticipant(id);
				});
				break;
			}
			default:
				break;
		}
	};

	return { handleSingleSelectChange, handleMultiSelectChange };
}
