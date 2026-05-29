import type { QuestionPair } from "../types";
import type { QuestionPack } from "../question-packs/types";

export function pickQuestionPair(
  packs: QuestionPack[],
  selectedPackIds: string[],
): QuestionPair {
  const pairs = packs
    .filter((pack) => selectedPackIds.includes(pack.id))
    .flatMap((pack) => pack.pairs);

  if (pairs.length === 0) {
    return {
      crewQuestion: "How many days are in a week?",
      impostorQuestion: "How many hours are in a day?",
      answerType: "number",
      crewAnswer: "7",
      impostorAnswer: "24",
    };
  }

  const index = Math.floor(Math.random() * pairs.length);
  return pairs[index];
}
