import { englishPromptDecks } from "./en";
import { italianPromptDecks } from "./it";
import type { PromptDeck, PromptDeckLocale } from "./types";

export type { PromptDeck, PromptDeckLocale } from "./types";

const decksByLocale: Record<PromptDeckLocale, PromptDeck[]> = {
  en: englishPromptDecks,
  it: italianPromptDecks,
};

export function getPromptDecksForLocale(locale: string): PromptDeck[] {
  if (locale === "it") {
    return decksByLocale.it;
  }
  return decksByLocale.en;
}

export function getDefaultPromptPackIds(locale: string): string[] {
  return getPromptDecksForLocale(locale)
    .filter((deck) => !deck.isAdult)
    .map((deck) => deck.id);
}
