import type { WordPair } from "../types";
import type { WordPack } from "../word-packs/types";

export function pickWordPair(packs: WordPack[], selectedPackIds: string[]): WordPair {
  const pairs = packs
    .filter((pack) => selectedPackIds.includes(pack.id))
    .flatMap((pack) => pack.pairs);

  if (pairs.length === 0) {
    return { crewWord: "Word", spyWord: "Similar" };
  }

  const index = Math.floor(Math.random() * pairs.length);
  return pairs[index];
}
