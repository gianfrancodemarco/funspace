import type { WordList } from "../types";

import generalWords from "../data/en/general.json";
import foodWords from "../data/en/food.json";
import animalsWords from "../data/en/animals.json";
import placesWords from "../data/en/places.json";

export const englishWordLists: WordList[] = [
  {
    id: "general",
    nameKey: "hangman.packs.general",
    words: generalWords,
  },
  {
    id: "food",
    nameKey: "hangman.packs.food",
    words: foodWords,
  },
  {
    id: "animals",
    nameKey: "hangman.packs.animals",
    words: animalsWords,
  },
  {
    id: "places",
    nameKey: "hangman.packs.places",
    words: placesWords,
  },
];
