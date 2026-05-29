import type { WordList } from "../word-lists/types";

export function pickWord(lists: WordList[], listIds: string[]): string {
  const selectedLists = lists.filter((list) => listIds.includes(list.id));
  const words = selectedLists.flatMap((list) => list.words);

  if (words.length === 0) {
    throw new Error("No words available for selected lists");
  }

  const index = Math.floor(Math.random() * words.length);
  return words[index] ?? words[0]!;
}
