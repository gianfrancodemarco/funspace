import { englishDilemmaDecks } from "./en";
import { italianDilemmaDecks } from "./it";
import type { DilemmaDeck, DilemmaDeckLocale } from "./types";

export type { DilemmaDeck, DilemmaDeckLocale } from "./types";

const decksByLocale: Record<DilemmaDeckLocale, DilemmaDeck[]> = {
  en: englishDilemmaDecks,
  it: italianDilemmaDecks,
};

export function getDilemmaDecksForLocale(locale: string): DilemmaDeck[] {
  if (locale === "it") {
    return decksByLocale.it;
  }
  return decksByLocale.en;
}

export function getDefaultDilemmaPackIds(locale: string): string[] {
  return getDilemmaDecksForLocale(locale)
    .filter((deck) => !deck.isAdult)
    .map((deck) => deck.id);
}
