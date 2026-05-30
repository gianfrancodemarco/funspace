export type PromptDeckLocale = "en" | "it";

export type TruthOrDarePack = {
  id: string;
  nameKey: string;
  isAdult: boolean;
  truths: string[];
  dares: string[];
};
