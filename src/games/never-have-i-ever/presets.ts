export type NeverHaveIEverPresetId =
  | "icebreaker"
  | "mixed"
  | "allAges"
  | "custom";

export type NeverHaveIEverPreset = {
  id: Exclude<NeverHaveIEverPresetId, "custom">;
  nameKey: string;
  promptPackIds: string[];
};

export const neverHaveIEverPresets: NeverHaveIEverPreset[] = [
  {
    id: "icebreaker",
    nameKey: "neverHaveIEver.presets.icebreaker",
    promptPackIds: ["classic"],
  },
  {
    id: "mixed",
    nameKey: "neverHaveIEver.presets.mixed",
    promptPackIds: ["classic", "travel", "foodFun"],
  },
  {
    id: "allAges",
    nameKey: "neverHaveIEver.presets.allAges",
    promptPackIds: ["classic", "travel", "foodFun"],
  },
];

export function getPresetPackIds(
  presetId: NeverHaveIEverPresetId,
): string[] | null {
  if (presetId === "custom") {
    return null;
  }

  const preset = neverHaveIEverPresets.find((entry) => entry.id === presetId);
  return preset?.promptPackIds ?? null;
}
