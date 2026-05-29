import type { WordPack } from "../types";

import generalPairs from "../data/it/general.json";
import foodPairs from "../data/it/food.json";
import animalsPairs from "../data/it/animals.json";
import placesPairs from "../data/it/places.json";

export const italianWordPacks: WordPack[] = [
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
