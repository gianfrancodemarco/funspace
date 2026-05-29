import type { PromptDeck } from "../prompt-decks/types";
import { shuffleDeck } from "./shuffle-deck";

export function buildDeck(decks: PromptDeck[], packIds: string[]): string[] {
  const selectedDecks = decks.filter((deck) => packIds.includes(deck.id));
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const deck of selectedDecks) {
    for (const prompt of deck.prompts) {
      if (!seen.has(prompt)) {
        seen.add(prompt);
        merged.push(prompt);
      }
    }
  }

  return shuffleDeck(merged);
}
