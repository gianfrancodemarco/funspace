import type { WouldYouRatherDilemma } from "../types";

export type DilemmaDeckLocale = "en" | "it";

export type DilemmaDeck = {
  id: string;
  nameKey: string;
  isAdult: boolean;
  dilemmas: WouldYouRatherDilemma[];
};
