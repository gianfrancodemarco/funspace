import { englishWordPacks } from "./en";
import { italianWordPacks } from "./it";
import type { WordPack, WordPackLocale } from "./types";

export type { WordPack, WordPackLocale } from "./types";

const packsByLocale: Record<WordPackLocale, WordPack[]> = {
  en: englishWordPacks,
  it: italianWordPacks,
};

export function getWordPacksForLocale(locale: string): WordPack[] {
  if (locale === "it") {
    return packsByLocale.it;
  }
  return packsByLocale.en;
}

export function getDefaultWordPackIds(locale: string): string[] {
  return getWordPacksForLocale(locale).map((pack) => pack.id);
}

export function getAllWordPackIds(locale: string): string[] {
  return getDefaultWordPackIds(locale);
}
