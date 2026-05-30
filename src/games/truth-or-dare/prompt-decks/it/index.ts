import type { TruthOrDarePack } from "../types";

import classicPack from "../data/it/classic.json";
import sillyPack from "../data/it/silly.json";
import spicyPack from "../data/it/spicy.json";

export const italianPromptDecks: TruthOrDarePack[] = [
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
