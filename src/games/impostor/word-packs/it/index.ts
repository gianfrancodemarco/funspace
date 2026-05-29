import type { WordPack } from "../types";

export const italianWordPacks: WordPack[] = [
  {
    id: "general",
    nameKey: "impostor.packs.general",
    pairs: [
      { crewWord: "Pizza", spyWord: "Pasta" },
      { crewWord: "Spiaggia", spyWord: "Piscina" },
      { crewWord: "Caffè", spyWord: "Tè" },
      { crewWord: "Film", spyWord: "Serie" },
      { crewWord: "Treno", spyWord: "Autobus" },
      { crewWord: "Inverno", spyWord: "Autunno" },
    ],
  },
  {
    id: "food",
    nameKey: "impostor.packs.food",
    pairs: [
      { crewWord: "Sushi", spyWord: "Sashimi" },
      { crewWord: "Hamburger", spyWord: "Panino" },
      { crewWord: "Cioccolato", spyWord: "Caramello" },
      { crewWord: "Insalata", spyWord: "Zuppa" },
      { crewWord: "Bistecca", spyWord: "Costine" },
      { crewWord: "Limonata", spyWord: "Succo" },
    ],
  },
  {
    id: "animals",
    nameKey: "impostor.packs.animals",
    pairs: [
      { crewWord: "Cane", spyWord: "Lupo" },
      { crewWord: "Gatto", spyWord: "Lince" },
      { crewWord: "Aquila", spyWord: "Falco" },
      { crewWord: "Squalo", spyWord: "Delfino" },
      { crewWord: "Orso", spyWord: "Panda" },
      { crewWord: "Rana", spyWord: "Rospo" },
    ],
  },
  {
    id: "places",
    nameKey: "impostor.packs.places",
    pairs: [
      { crewWord: "Parigi", spyWord: "Londra" },
      { crewWord: "Museo", spyWord: "Galleria" },
      { crewWord: "Hotel", spyWord: "Ostello" },
      { crewWord: "Foresta", spyWord: "Parco" },
      { crewWord: "Aeroporto", spyWord: "Stazione" },
      { crewWord: "Biblioteca", spyWord: "Libreria" },
    ],
  },
];
