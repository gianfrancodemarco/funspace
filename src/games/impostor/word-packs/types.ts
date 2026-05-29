import type { WordPair } from "../types";

export type WordPack = {
  id: string;
  nameKey: string;
  pairs: WordPair[];
};

export type WordPackLocale = "en" | "it";
