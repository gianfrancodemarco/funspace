import type { QuestionPair } from "../../types";
import type { QuestionPack } from "../types";

import everydayPairs from "../data/en/everyday.json";
import generalPairs from "../data/en/general.json";
import numbersPairs from "../data/en/numbers.json";
import popCulturePairs from "../data/en/pop-culture.json";

export const englishQuestionPacks: QuestionPack[] = [
  {
    id: "general",
    nameKey: "questionImpostor.packs.general",
    pairs: generalPairs as QuestionPair[],
  },
  {
    id: "numbers",
    nameKey: "questionImpostor.packs.numbers",
    pairs: numbersPairs as QuestionPair[],
  },
  {
    id: "everyday",
    nameKey: "questionImpostor.packs.everyday",
    pairs: everydayPairs as QuestionPair[],
  },
  {
    id: "pop-culture",
    nameKey: "questionImpostor.packs.popCulture",
    pairs: popCulturePairs as QuestionPair[],
  },
];
