import { englishQuestionPacks } from "./en";
import { italianQuestionPacks } from "./it";
import type { QuestionPack, QuestionPackLocale } from "./types";

export type { QuestionPack, QuestionPackLocale } from "./types";

const packsByLocale: Record<QuestionPackLocale, QuestionPack[]> = {
  en: englishQuestionPacks,
  it: italianQuestionPacks,
};

export function getQuestionPacksForLocale(locale: string): QuestionPack[] {
  if (locale === "it") {
    return packsByLocale.it;
  }
  return packsByLocale.en;
}

export function getDefaultQuestionPackIds(locale: string): string[] {
  return getQuestionPacksForLocale(locale).map((pack) => pack.id);
}
