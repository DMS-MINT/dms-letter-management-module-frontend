import { SelectableInput } from "@/components/forms";
import { CCAndBCCInputs } from "@/components/templates";
import { useLetterStore, useUiStore } from "@/stores";
import { RoleEnum } from "@/types/letter_module";
import { Label } from "@radix-ui/react-label";
import Paper from "./Paper";

export default function IncomingLetterTemplate() {
	const { subject, updateLetterField } = useLetterStore((state) => ({
		subject: state.subject,
		updateLetterField: state.updateLetterField,
	}));

	const { isLetterReadOnly, setLetterEdited } = useUiStore((state) => ({
		isLetterReadOnly: state.isLetterReadOnly,
		setLetterEdited: state.setLetterEdited,
	}));

	const handleSubjectChange = (value: string) => {
		updateLetterField("subject", value);
		setLetterEdited(true);
	};

	return (
		<Paper>
			<div className="mb-2 flex w-full items-center gap-2 self-center">
				<Label>ጉዳዩ:-</Label>
				<input
					type="text"
					value={subject}
					readOnly={isLetterReadOnly}
					className="w-full rounded-none focus:border-b focus:outline-0"
					onChange={(e) => handleSubjectChange(e.target.value)}
				/>
			</div>
			<SelectableInput
				name={RoleEnum["AUTHOR"]}
				isClearable={true}
				placeholder="እባክዎ የደብዳቤው ከማን እንደተላከ ያስገቡ"
				orientation="vertical"
				prefix="ከ"
			/>
			<SelectableInput
				name={RoleEnum["PRIMARY RECIPIENT"]}
				isClearable={true}
				placeholder="እባክዎ የደብዳቤው ለማን እንደተላከ ያስገቡ"
				orientation="vertical"
				prefix="ለ"
			/>
			<CCAndBCCInputs />
		</Paper>
	);
}
