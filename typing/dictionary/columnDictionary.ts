import { ColumnEnum } from "../enum";

const columnDictionary: Record<ColumnEnum, string> = {
  [ColumnEnum.IS_READ]: "የንባብ ሁኔታ",
  [ColumnEnum.LETTER_ID]: "የደብዳቤ ቁጥር",
  [ColumnEnum.SENDER]: "ከ",
  [ColumnEnum.SENT_TO]: "ለ",
  [ColumnEnum.SUBJECT]: "ጉዳዩ",
  [ColumnEnum.TYPE]: "የደብዳቤ አይነት",
  [ColumnEnum.STATUS]: "የደብዳቤ ሁኔታ",
  [ColumnEnum.RECEIVED_AT]: "የደረሰበት ቀን",
  [ColumnEnum.SENT_AT]: "የተላከበት ቀን",
};

export default columnDictionary;
