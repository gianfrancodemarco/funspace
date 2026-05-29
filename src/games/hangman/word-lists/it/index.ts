import type { WordList } from "../types";

import generalWords from "../data/it/general.json";
import foodWords from "../data/it/food.json";
import animalsWords from "../data/it/animals.json";
import placesWords from "../data/it/places.json";
import animeWords from "../data/it/anime.json";
import moviesWords from "../data/it/movies.json";
import musicWords from "../data/it/music.json";

export const italianWordLists: WordList[] = [
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
