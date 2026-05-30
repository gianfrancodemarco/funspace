import { englishPromptDecks } from "./en";
import { italianPromptDecks } from "./it";
import type { PromptDeckLocale, TruthOrDarePack } from "./types";

export type { PromptDeckLocale, TruthOrDarePack } from "./types";

const decksByLocale: Record<PromptDeckLocale, TruthOrDarePack[]> = {
  en: englishPromptDecks,
  it: italianPromptDecks,
};

export function getPromptDecksForLocale(locale: string): TruthOrDarePack[] {
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
