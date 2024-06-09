import { letterStatusLookup, letterStatusStyleMap } from "@/typing/dictionary";

const getTranslatedLetterStatus = (
  status: string
): { amharicTranslation: string; badgeVariant: string } => {
  const amharicTranslation = letterStatusLookup[status];
  const badgeVariant = letterStatusStyleMap[status];

  return {
    amharicTranslation,
    badgeVariant,
  };
};

export default getTranslatedLetterStatus;
