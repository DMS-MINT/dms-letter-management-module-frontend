import { LetterTableColumns } from "./LetterTableColumns";

export const letterTypeTranslations: Record<string, string> = {
	INTERNAL: "የውስጥ ደብዳቤ",
	INCOMING: "ከውጭ የተላከ",
	OUTGOING: "ወደ ውጪ የሚላክ",
};

export const letterCategoryTranslations: Record<string, string> = {
	INBOX: "ገቢ ደብዳቤዎች",
	OUTBOX: "የተላኩ ደብዳቤዎች",
	DRAFT: "ረቂቆች",
	ARCHIVE: "ማህደር",
	TRASH: "መጣያ",
	PENDING: "በመጠባበቅ ላይ",
	PUBLISHED: "የጸደቁ ደብዳቤዎች",
};

export const letterStatusTranslations: Record<string, string> = {
	DRAFT: "ረቂቅ",
	SUBMITTED: "በመጠባበቅ ላይ",
	PUBLISHED: "የጸደቀ",
	CLOSED: "የተዘጋ",
	REJECTED: "ውድቅ ተደርጓል",
	TRASHED: "የተጣለ",
};

export const monthTranslations: Record<number, string> = {
	1: "መስከረም",
	2: "ጥቅምት",
	3: "ህዳር",
	4: "ታህሳስ",
	5: "ጥር",
	6: "የካቲት",
	7: "መጋቢት",
	8: "ሚያዝያ",
	9: "ግንቦት",
	10: "ሰኔ",
	11: "ሐምሌ",
	12: "ነሐሴ",
	13: "ጳጉሜ",
};

export const hourTranslations: Record<number, { AM: string; PM: string }> = {
	1: { AM: "ከለሊቱ 7", PM: "ከቀኑ 7" },
	2: { AM: "ከለሊቱ 8", PM: "ከቀኑ 8" },
	3: { AM: "ከለሊቱ 9", PM: "ከቀኑ 9" },
	4: { AM: "ከለሊቱ 10", PM: "ከቀኑ 10" },
	5: { AM: "ከለሊቱ 11", PM: "ከቀኑ 11" },
	6: { AM: "ማለዳ 12", PM: "ከምሽቱ 12" },
	7: { AM: "ከጠዋቱ 1", PM: "ከምሽቱ 1" },
	8: { AM: "ከጠዋቱ 2", PM: "ከምሽቱ 2" },
	9: { AM: "ከጠዋቱ 3", PM: "ከምሽቱ 3" },
	10: { AM: "ከጠዋቱ 4", PM: "ከምሽቱ 4" },
	11: { AM: "ከጠዋቱ 5", PM: "ከምሽቱ 5" },
	12: { AM: "ከቀኑ 6", PM: "ከለሊቱ 6" },
};

export const columnTranslation: Record<LetterTableColumns, string> = {
	[LetterTableColumns.ID]: "የደብዳቤ ቁጥር",
	[LetterTableColumns.REFERENCE_NUMBER]: "የመዝገብ ቁጥር",
	[LetterTableColumns.HAS_READ]: "የንባብ ሁኔታ",
	[LetterTableColumns.SUBJECT]: "ጉዳዩ",
	[LetterTableColumns.CURRENT_STATE]: "የደብዳቤ ሁኔታ",
	[LetterTableColumns.SENDER]: "ከ",
	[LetterTableColumns.RECIPIENT]: "ለ",
	// [LetterTableColumns.RECEIVED_AT]: "የደረሰበት ቀን",
	[LetterTableColumns.LETTER_TYPE]: "የደብዳቤ አይነት",
	[LetterTableColumns.SUBMITTED_AT]: "የተላለፈበት ቀን",
	[LetterTableColumns.PUBLISHED_AT]: "ያከፋፈለበት ቀን",
	[LetterTableColumns.CREATED_AT]: "የተፈጠረበት ቀን",
	[LetterTableColumns.UPDATED_AT]: "የተቀየረበት ቀን",
};
