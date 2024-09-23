import type {
	LetterContentStoreType,
	ParticipantStoreType,
} from "@/lib/stores";
import { RoleEnum } from "@/types/letter_module";

function isBodyEmpty(html: string): boolean {
	if (typeof document === "undefined") {
		// If document is not defined (e.g., during SSR), return false
		return false;
	}

	const tempDiv: HTMLDivElement = document.createElement("div");
	tempDiv.innerHTML = html;

	const textContent = tempDiv.textContent?.trim() || "";

	return (
		textContent === "" && !tempDiv.querySelector("img, iframe, video, audio")
	);
}

export default function canSubmitLetter(
	letter: Omit<LetterContentStoreType, "reference_number" | "published_at"> &
		ParticipantStoreType
): boolean {
	const hasPrimaryRecipient = letter.participants.some(
		(participant) => participant.role === RoleEnum["PRIMARY RECIPIENT"]
	);

	const hasAuthor = letter.participants.some(
		(participant) => participant.role === RoleEnum["AUTHOR"]
	);

	const hasSubject = letter.subject.trim() !== "";

	const hasBody = !isBodyEmpty(letter.body);

	const hasAttachment = true;

	if (letter.letter_type === "incoming") {
		return hasAuthor && hasPrimaryRecipient && hasSubject && hasAttachment;
	}

	return hasPrimaryRecipient && hasBody && hasSubject;
}
