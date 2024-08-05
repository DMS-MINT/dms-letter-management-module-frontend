import type { LetterDetailType } from "@/types/letter_module";
import { memo } from "react";
import { IncomingLetterTemplate } from ".";
import InternalLetterTemplate from "./IncomingLetterTemplate";
import OutgoingLetterTemplate from "./OutgoingLetterTemplate";

function EditableLetter({ letter }: { letter: LetterDetailType }) {
	return (
		<>
			{letter.letter_type === "internal" ? (
				<InternalLetterTemplate />
			) : letter.letter_type === "outgoing" ? (
				<OutgoingLetterTemplate />
			) : (
				<IncomingLetterTemplate />
			)}
		</>
	);
}

export default memo(EditableLetter);
