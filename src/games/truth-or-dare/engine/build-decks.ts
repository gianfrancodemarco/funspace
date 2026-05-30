import type { TruthOrDarePack } from "../prompt-decks/types";
import { shuffleDeck } from "./shuffle-deck";

export type BuiltDecks = {
  truthDeck: string[];
  dareDeck: string[];
};

export function buildDecks(
  packs: TruthOrDarePack[],
  packIds: string[],
): BuiltDecks {
  const selectedPacks = packs.filter((pack) => packIds.includes(pack.id));
  const seenTruths = new Set<string>();
  const seenDares = new Set<string>();
  const truths: string[] = [];
  const dares: string[] = [];

  for (const pack of selectedPacks) {
    for (const truth of pack.truths) {
      if (!seenTruths.has(truth)) {
        seenTruths.add(truth);
        truths.push(truth);
      }
    }
    for (const dare of pack.dares) {
      if (!seenDares.has(dare)) {
        seenDares.add(dare);
        dares.push(dare);
      }
    }
  }

  return {
    truthDeck: shuffleDeck(truths),
    dareDeck: shuffleDeck(dares),
  };
}
