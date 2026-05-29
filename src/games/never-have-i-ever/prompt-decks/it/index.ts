import type { PromptDeck } from "../types";

import classicPrompts from "../data/it/classic.json";
import travelPrompts from "../data/it/travel.json";
import foodFunPrompts from "../data/it/foodFun.json";
import spicyPrompts from "../data/it/spicy.json";

export const italianPromptDecks: PromptDeck[] = [
  {
    id: "classic",
    nameKey: "neverHaveIEver.packs.classic",
    isAdult: false,
    prompts: classicPrompts,
  },
  {
    id: "travel",
    nameKey: "neverHaveIEver.packs.travel",
    isAdult: false,
    prompts: travelPrompts,
  },
  {
    id: "foodFun",
    nameKey: "neverHaveIEver.packs.foodFun",
    isAdult: false,
    prompts: foodFunPrompts,
  },
  {
    id: "spicy",
    nameKey: "neverHaveIEver.packs.spicy",
    isAdult: true,
    prompts: spicyPrompts,
  },
];
