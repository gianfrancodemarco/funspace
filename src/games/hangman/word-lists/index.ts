import { englishWordLists } from "./en";
import { italianWordLists } from "./it";
import type { WordList, WordListLocale } from "./types";

export type { WordList, WordListLocale } from "./types";

const listsByLocale: Record<WordListLocale, WordList[]> = {
  en: englishWordLists,
  it: italianWordLists,
};

export function getWordListsForLocale(locale: string): WordList[] {
  if (locale === "it") {
    return listsByLocale.it;
  }
  return listsByLocale.en;
}

export function getDefaultWordListIds(locale: string): string[] {
  return getWordListsForLocale(locale).map((list) => list.id);
}
