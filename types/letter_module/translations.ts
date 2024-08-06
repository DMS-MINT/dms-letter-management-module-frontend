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
	PENDING: "መጽደቅን በመጠባበቅ ላይ",
	PUBLISHED: "የታተሙ ደብዳቤዎች",
};

export const letterStatusTranslations: Record<string, string> = {
	DRAFT: "ረቂቅ",
	SUBMITTED: "በመጠባበቅ ላይ",
	PUBLISHED: "የታተመ",
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

export const columnTranslation: Record<LetterTableColumns, string> = {
	[LetterTableColumns.ID]: "የደብዳቤ ቁጥር",
	[LetterTableColumns.REFERENCE_NUMBER]: "የደብዳቤ ቁጥር",
	[LetterTableColumns.HAS_READ]: "የንባብ ሁኔታ",
	[LetterTableColumns.SUBJECT]: "ጉዳዩ",
	[LetterTableColumns.CURRENT_STATE]: "የደብዳቤ ሁኔታ",
	[LetterTableColumns.SENDER]: "ከ",
	[LetterTableColumns.RECIPIENT]: "ለ",
	[LetterTableColumns.RECEIVED_AT]: "የደረሰበት ቀን",
	[LetterTableColumns.LETTER_TYPE]: "የደብዳቤ አይነት",
	[LetterTableColumns.SUBMITTED_AT]: "የተላለፈበት ቀን",
	[LetterTableColumns.PUBLISHED_AT]: "ያከፋፈለበት ቀን",
	[LetterTableColumns.CREATED_AT]: "የተፈጠረበት ቀን",
	[LetterTableColumns.UPDATED_AT]: "የተቀየረበት ቀን",
};
