import type { GameAccentColor } from "@/catalog/types";

const gameAccentBorderClasses: Record<GameAccentColor, string> = {
  impostor: "border-t-orange-500",
  hangman: "border-t-sky-500",
  "never-have-i-ever": "border-t-pink-500",
  "question-impostor": "border-t-violet-500",
  "truth-or-dare": "border-t-rose-500",
  "would-you-rather": "border-t-teal-500",
};

export function getGameAccentBorderClass(accentColor: GameAccentColor): string {
  return gameAccentBorderClasses[accentColor];
}
