import type { TruthOrDarePack } from "../types";

import classicPack from "../data/en/classic.json";
import sillyPack from "../data/en/silly.json";
import spicyPack from "../data/en/spicy.json";

export const englishPromptDecks: TruthOrDarePack[] = [
  {
    id: "classic",
    nameKey: "truthOrDare.packs.classic",
    isAdult: false,
    truths: classicPack.truths,
    dares: classicPack.dares,
  },
  {
    id: "silly",
    nameKey: "truthOrDare.packs.silly",
    isAdult: false,
    truths: sillyPack.truths,
    dares: sillyPack.dares,
  },
  {
    id: "spicy",
    nameKey: "truthOrDare.packs.spicy",
    isAdult: true,
    truths: spicyPack.truths,
    dares: spicyPack.dares,
  },
];
