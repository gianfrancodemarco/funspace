import type { DilemmaDeck } from "../types";

import classicDilemmas from "../data/it/classic.json";
import grossDilemmas from "../data/it/gross.json";
import hypotheticalDilemmas from "../data/it/hypothetical.json";
import spicyDilemmas from "../data/it/spicy.json";

export const italianDilemmaDecks: DilemmaDeck[] = [
  {
    id: "classic",
    nameKey: "wouldYouRather.packs.classic",
    isAdult: false,
    dilemmas: classicDilemmas,
  },
  {
    id: "gross",
    nameKey: "wouldYouRather.packs.gross",
    isAdult: false,
    dilemmas: grossDilemmas,
  },
  {
    id: "hypothetical",
    nameKey: "wouldYouRather.packs.hypothetical",
    isAdult: false,
    dilemmas: hypotheticalDilemmas,
  },
  {
    id: "spicy",
    nameKey: "wouldYouRather.packs.spicy",
    isAdult: true,
    dilemmas: spicyDilemmas,
  },
];
