import type { WordPack } from "../types";

import generalPairs from "../data/en/general.json";
import foodPairs from "../data/en/food.json";
import animalsPairs from "../data/en/animals.json";
import placesPairs from "../data/en/places.json";
import animePairs from "../data/en/anime.json";
import moviesPairs from "../data/en/movies.json";
import musicPairs from "../data/en/music.json";

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
  {
    id: "anime",
    nameKey: "impostor.packs.anime",
    pairs: animePairs,
  },
  {
    id: "movies",
    nameKey: "impostor.packs.movies",
    pairs: moviesPairs,
  },
  {
    id: "music",
    nameKey: "impostor.packs.music",
    pairs: musicPairs,
  },
];
