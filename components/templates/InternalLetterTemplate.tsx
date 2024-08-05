import { SelectableInput } from "@/components/forms";
import { CCAndBCCInputs, SubjectAndContent } from "@/components/templates";
import { RoleEnum } from "@/types/letter_module";
import Paper from "./Paper";

export default function InternalLetterTemplate() {
	return (
		<Paper>
			<SelectableInput
				name={RoleEnum["PRIMARY RECIPIENT"]}
				isClearable={true}
				placeholder="እባክዎ የደብዳቤውን ለማን እንደሚልኩ ያስገቡ"
				orientation="vertical"
			/>
			<SubjectAndContent />
			<CCAndBCCInputs />
		</Paper>
	);
}
