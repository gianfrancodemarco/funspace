export type PromptDeckLocale = "en" | "it";

export type PromptDeck = {
  id: string;
  nameKey: string;
  isAdult: boolean;
  prompts: string[];
};
