import { ColumnEnum } from "../enum";

export const columnDictionary: Record<ColumnEnum, string> = {
  [ColumnEnum.ID]: "የደብዳቤ ቁጥር",
  [ColumnEnum.HAS_READ]: "የንባብ ሁኔታ",
  [ColumnEnum.SUBJECT]: "ጉዳዩ",
  [ColumnEnum.STATUS]: "የደብዳቤ ሁኔታ",
  [ColumnEnum.SENDER]: "ከ",
  [ColumnEnum.RECIPIENT]: "ለ",
  [ColumnEnum.LETTER_TYPE]: "የደብዳቤ አይነት",
  [ColumnEnum.SENT_AT]: "የተላከበት ቀን",
  [ColumnEnum.RECEIVED_AT]: "የደረሰበት ቀን",
  [ColumnEnum.CREATED_AT]: "የተፈጠረበት ቀን",
  [ColumnEnum.UPDATED_AT]: "የተቀየረበት ቀን",
};
