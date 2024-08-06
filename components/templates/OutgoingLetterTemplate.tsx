import { SelectableInput } from "@/components/forms";
import {
	CCAndBCCInputs,
	OutgoingLetterFooter,
	OutgoingLetterHeader,
	RefNoAndDate,
	SubjectAndContent,
} from "@/components/templates";
import { RoleEnum } from "@/types/letter_module";
import Paper from "./Paper";

export default function OutgoingLetterTemplate() {
	return (
		<Paper>
			<OutgoingLetterHeader />
			<RefNoAndDate />
			<SelectableInput
				name={RoleEnum["PRIMARY RECIPIENT"]}
				isClearable={true}
				placeholder="እባክዎ የደብዳቤውን ለማን እንደሚልኩ ይምረጡ"
				orientation="vertical"
				prefix="ለ"
			/>
			<SubjectAndContent />
			<CCAndBCCInputs />
			<OutgoingLetterFooter />
		</Paper>
	);
}
