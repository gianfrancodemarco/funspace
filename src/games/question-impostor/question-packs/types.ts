import type { QuestionPair } from "../types";

export type QuestionPack = {
  id: string;
  nameKey: string;
  pairs: QuestionPair[];
};

export type QuestionPackLocale = "en" | "it";
