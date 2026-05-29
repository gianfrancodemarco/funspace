import type { QuestionPair } from "../../types";
import type { QuestionPack } from "../types";

import everydayPairs from "../data/it/everyday.json";
import generalPairs from "../data/it/general.json";
import numbersPairs from "../data/it/numbers.json";
import popCulturePairs from "../data/it/pop-culture.json";

export const italianQuestionPacks: QuestionPack[] = [
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
