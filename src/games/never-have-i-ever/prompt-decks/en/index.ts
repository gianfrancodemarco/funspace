import type { PromptDeck } from "../types";

import classicPrompts from "../data/en/classic.json";
import travelPrompts from "../data/en/travel.json";
import foodFunPrompts from "../data/en/foodFun.json";
import spicyPrompts from "../data/en/spicy.json";

export const englishPromptDecks: PromptDeck[] = [
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
