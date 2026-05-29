import type { WordPack } from "../types";

import generalPairs from "../data/en/general.json";
import foodPairs from "../data/en/food.json";
import animalsPairs from "../data/en/animals.json";
import placesPairs from "../data/en/places.json";

export const englishWordPacks: WordPack[] = [
  {
    id: "general",
    nameKey: "impostor.packs.general",
    pairs: generalPairs,
  },
  {
    id: "food",
    nameKey: "impostor.packs.food",
    pairs: foodPairs,
  },
  {
    id: "animals",
    nameKey: "impostor.packs.animals",
    pairs: animalsPairs,
  },
  {
    id: "places",
    nameKey: "impostor.packs.places",
    pairs: placesPairs,
  },
];
