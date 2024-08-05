import type { LetterStoreType } from "@/stores";
import type { ParticipantType } from "@/types/letter_module";
import { RoleEnum } from "@/types/letter_module";

function isHtmlStringEmpty(htmlString: string): boolean {
	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlString, "text/html");

	function isElementEmpty(element: HTMLElement): boolean {
		if (element.textContent?.trim() !== "") {
			return false;
		}

		const children = Array.from(element.children);
		for (const child of children) {
			if (!isElementEmpty(child as HTMLElement)) {
				return false;
			}
		}

		return true;
	}

	return isElementEmpty(doc.body);
}

export default function canSubmitLetter(
	letter: LetterStoreType,
	participants: ParticipantType[]
): boolean {
	const hasPrimaryRecipient = participants.some(
		(participant) => participant.role === RoleEnum["PRIMARY RECIPIENT"]
	);

	const hasSubject = letter.subject.trim() !== "";

	const hasContent = !isHtmlStringEmpty(letter.content);

	return hasPrimaryRecipient && hasContent && hasSubject;
}
