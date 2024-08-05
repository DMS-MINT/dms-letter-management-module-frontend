import type { LetterStoreType } from "@/stores";
import type { ParticipantType } from "@/types/letter_module";
import { RoleEnum } from "@/types/letter_module";

function isContentEmpty(html: string): boolean {
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
	letter: LetterStoreType,
	participants: ParticipantType[]
): boolean {
	const hasPrimaryRecipient = participants.some(
		(participant) => participant.role === RoleEnum["PRIMARY RECIPIENT"]
	);

	const hasSubject = letter.subject.trim() !== "";

	const hasContent = !isContentEmpty(letter.content);

	return hasPrimaryRecipient && hasContent && hasSubject;
}
