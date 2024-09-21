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

export const hourTranslations: Record<number, string> = {
	1: "ከጠዋቱ 1", // "7:00 AM"
	2: "ከጠዋቱ 2", // "8:00 AM"
	3: "ከጠዋቱ 3", // "9:00 AM"
	4: "ከጠዋቱ 4", // "10:00 AM"
	5: "ከቀኑ 5", // "11:00 AM"
	6: "ከቀኑ 6", // "12:00 PM"
	7: "ከቀኑ 7", // "1:00 AM"
	8: "ከቀኑ 8", // "2:00 PM"
	9: "ከቀኑ 9", // "3:00 PM"
	10: "ከረፋዱ 10", // "4:00 PM"
	11: "ከረፋዱ 11", // "5:00 PM"
	12: "ከረፋዱ 12", // "6:00 PM"
	13: "ከምሽቱ 1", // "7:00 PM"
	14: "ከምሽቱ 2", // "8:00 PM"
	15: "ከምሽቱ 3", // "9:00 PM"
	16: "ከምሽቱ 4", // "10:00 PM"
	17: "ከምሽቱ 5", // "11:00 PM"
	18: "ከለሊቱ 6", // "12:00 AM"
	19: "ከለሊቱ 7", // "1:00 AM"
	20: "ከለሊቱ 8", // "2:00 AM"
	21: "ከለሊቱ 9", // "3:00 AM"
	22: "ከለሊቱ 10", // "4:00 AM"
	23: "ከለሊቱ 11", // "5:00 AM"
	24: "ማለዳ 12", // "6:00 AM"
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
