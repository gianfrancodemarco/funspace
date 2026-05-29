import type { WordList } from "../types";

import generalWords from "../data/en/general.json";
import foodWords from "../data/en/food.json";
import animalsWords from "../data/en/animals.json";
import placesWords from "../data/en/places.json";
import animeWords from "../data/en/anime.json";
import moviesWords from "../data/en/movies.json";
import musicWords from "../data/en/music.json";

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
  {
    id: "anime",
    nameKey: "hangman.packs.anime",
    words: animeWords,
  },
  {
    id: "movies",
    nameKey: "hangman.packs.movies",
    words: moviesWords,
  },
  {
    id: "music",
    nameKey: "hangman.packs.music",
    words: musicWords,
  },
];
