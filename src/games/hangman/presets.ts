export type HangmanPresetId = "classic" | "forgiving" | "custom";

export type HangmanPreset = {
  id: HangmanPresetId;
  nameKey: string;
  maxWrongGuesses: number;
};

export const hangmanPresets: HangmanPreset[] = [
  {
    id: "classic",
    nameKey: "hangman.presets.classic",
    maxWrongGuesses: 6,
  },
  {
    id: "forgiving",
    nameKey: "hangman.presets.forgiving",
    maxWrongGuesses: 8,
  },
];

export function getPresetMaxWrongGuesses(presetId: HangmanPresetId): number {
  if (presetId === "custom") {
    return 6;
  }

  const preset = hangmanPresets.find((entry) => entry.id === presetId);
  return preset?.maxWrongGuesses ?? 6;
}
