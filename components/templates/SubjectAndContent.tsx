import { useLetterStore, useUiStore } from "@/stores";
import { Label } from "@radix-ui/react-label";
import { BlockEditor } from "../BlockEditor";

export default function SubjectAndContent() {
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
		<>
			<div className="mb-2 flex w-full items-center gap-2 self-center">
				<Label>ጉዳዩ:-</Label>
				<input
					type="text"
					value={subject}
					disabled={isLetterReadOnly}
					className="w-full rounded-none focus:border-b focus:outline-0"
					onChange={(e) => handleSubjectChange(e.target.value)}
				/>
			</div>
			<BlockEditor />
		</>
	);
}
