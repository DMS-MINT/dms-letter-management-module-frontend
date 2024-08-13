import useBlockEditor from "@/hooks/useBlockEditor";
import { useLetterRevisionStore } from "@/lib/stores";
import { memo, useMemo } from "react";
import {
	IncomingLetterTemplate,
	InternalLetterTemplate,
	OutgoingLetterTemplate,
} from ".";
import type { TemplateProps } from "./types";

function EditableLetter({ editable }: { editable: boolean }) {
	const {
		subject,
		body,
		letter_type,
		reference_number,
		published_at,
		participants,
		updateLetterField,
		addParticipant,
		removeParticipant,
	} = useLetterRevisionStore();

	const { editor } = useBlockEditor({
		editable: editable,
		body,
		updateLetterField,
	});

	const TemplateComponent = useMemo(() => {
		const templateMap: Record<string, React.FC<TemplateProps>> = {
			internal: InternalLetterTemplate,
			outgoing: OutgoingLetterTemplate,
			IncomingLetterTemplate: IncomingLetterTemplate,
		};

		return templateMap[letter_type] || null;
	}, [letter_type]);

	if (!editor) return null;

	return (
		<TemplateComponent
			editor={editor}
			subject={subject}
			reference_number={reference_number}
			published_at={published_at}
			participants={participants}
			isLetterReadOnly={!editable}
			updateLetterField={updateLetterField}
			addParticipant={addParticipant}
			removeParticipant={removeParticipant}
		/>
	);
}

export default memo(EditableLetter);
