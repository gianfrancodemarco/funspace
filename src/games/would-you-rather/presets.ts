export type WouldYouRatherPresetId =
  | "classic"
  | "partyMix"
  | "allAges"
  | "custom";

export type WouldYouRatherPreset = {
  id: Exclude<WouldYouRatherPresetId, "custom">;
  nameKey: string;
  promptPackIds: string[];
};

export const wouldYouRatherPresets: WouldYouRatherPreset[] = [
  {
    id: "classic",
    nameKey: "wouldYouRather.presets.classic",
    promptPackIds: ["classic"],
  },
  {
    id: "partyMix",
    nameKey: "wouldYouRather.presets.partyMix",
    promptPackIds: ["classic", "gross", "hypothetical"],
  },
  {
    id: "allAges",
    nameKey: "wouldYouRather.presets.allAges",
    promptPackIds: ["classic", "gross", "hypothetical"],
  },
];

export function getPresetPackIds(
  presetId: WouldYouRatherPresetId,
): string[] | null {
  if (presetId === "custom") {
    return null;
  }

  const preset = wouldYouRatherPresets.find((entry) => entry.id === presetId);
  return preset?.promptPackIds ?? null;
}
