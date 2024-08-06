import type { LetterDetailType } from "@/types/letter_module";

function ReadOnlyLetter({ letter }: { letter: LetterDetailType }) {
	return <div>{letter.pdf_version}</div>;
}

export default ReadOnlyLetter;
