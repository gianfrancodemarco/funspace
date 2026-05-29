import type { WordPack } from "../types";

export const englishWordPacks: WordPack[] = [
  {
    id: "general",
    nameKey: "impostor.packs.general",
    pairs: [
      { crewWord: "Pizza", spyWord: "Pasta" },
      { crewWord: "Beach", spyWord: "Pool" },
      { crewWord: "Coffee", spyWord: "Tea" },
      { crewWord: "Movie", spyWord: "Series" },
      { crewWord: "Train", spyWord: "Bus" },
      { crewWord: "Winter", spyWord: "Autumn" },
    ],
  },
  {
    id: "food",
    nameKey: "impostor.packs.food",
    pairs: [
      { crewWord: "Sushi", spyWord: "Sashimi" },
      { crewWord: "Burger", spyWord: "Sandwich" },
      { crewWord: "Chocolate", spyWord: "Caramel" },
      { crewWord: "Salad", spyWord: "Soup" },
      { crewWord: "Steak", spyWord: "Ribs" },
      { crewWord: "Lemonade", spyWord: "Juice" },
    ],
  },
  {
    id: "animals",
    nameKey: "impostor.packs.animals",
    pairs: [
      { crewWord: "Dog", spyWord: "Wolf" },
      { crewWord: "Cat", spyWord: "Lynx" },
      { crewWord: "Eagle", spyWord: "Hawk" },
      { crewWord: "Shark", spyWord: "Dolphin" },
      { crewWord: "Bear", spyWord: "Panda" },
      { crewWord: "Frog", spyWord: "Toad" },
    ],
  },
  {
    id: "places",
    nameKey: "impostor.packs.places",
    pairs: [
      { crewWord: "Paris", spyWord: "London" },
      { crewWord: "Museum", spyWord: "Gallery" },
      { crewWord: "Hotel", spyWord: "Hostel" },
      { crewWord: "Forest", spyWord: "Park" },
      { crewWord: "Airport", spyWord: "Station" },
      { crewWord: "Library", spyWord: "Bookstore" },
    ],
  },
];
