import type { DilemmaDeck } from "../dilemma-decks/types";
import { dilemmaKey, type WouldYouRatherDilemma } from "../types";
import { shuffleDeck } from "./shuffle-deck";

export function buildDeck(
  decks: DilemmaDeck[],
  packIds: string[],
): WouldYouRatherDilemma[] {
  const selectedDecks = decks.filter((deck) => packIds.includes(deck.id));
  const seen = new Set<string>();
  const merged: WouldYouRatherDilemma[] = [];

  for (const deck of selectedDecks) {
    for (const dilemma of deck.dilemmas) {
      const key = dilemmaKey(dilemma);
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(dilemma);
      }
    }
  }

  return shuffleDeck(merged);
}
