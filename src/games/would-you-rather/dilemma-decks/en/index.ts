import type { DilemmaDeck } from "../types";

import classicDilemmas from "../data/en/classic.json";
import grossDilemmas from "../data/en/gross.json";
import hypotheticalDilemmas from "../data/en/hypothetical.json";
import spicyDilemmas from "../data/en/spicy.json";

export const englishDilemmaDecks: DilemmaDeck[] = [
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
