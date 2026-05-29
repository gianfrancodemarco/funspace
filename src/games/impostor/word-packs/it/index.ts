import type { WordPack } from "../types";

import generalPairs from "../data/it/general.json";
import foodPairs from "../data/it/food.json";
import animalsPairs from "../data/it/animals.json";
import placesPairs from "../data/it/places.json";
import animePairs from "../data/it/anime.json";
import moviesPairs from "../data/it/movies.json";
import musicPairs from "../data/it/music.json";

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
