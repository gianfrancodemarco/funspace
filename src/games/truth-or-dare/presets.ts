import type { PromptMode } from "./types";

export type TruthOrDarePresetId =
  | "classic"
  | "sillyNight"
  | "daresOnly"
  | "allAges"
  | "custom";

export type TruthOrDarePreset = {
  id: Exclude<TruthOrDarePresetId, "custom">;
  nameKey: string;
  promptPackIds: string[];
  promptMode: PromptMode;
};

export const truthOrDarePresets: TruthOrDarePreset[] = [
  {
    id: "classic",
    nameKey: "truthOrDare.presets.classic",
    promptPackIds: ["classic"],
    promptMode: "both",
  },
  {
    id: "sillyNight",
    nameKey: "truthOrDare.presets.sillyNight",
    promptPackIds: ["classic", "silly"],
    promptMode: "both",
  },
  {
    id: "daresOnly",
    nameKey: "truthOrDare.presets.daresOnly",
    promptPackIds: ["classic", "silly"],
    promptMode: "dare_only",
  },
  {
    id: "allAges",
    nameKey: "truthOrDare.presets.allAges",
    promptPackIds: ["classic", "silly"],
    promptMode: "both",
  },
];

export function getPresetConfig(
  presetId: TruthOrDarePresetId,
): Omit<TruthOrDarePreset, "id" | "nameKey"> | null {
  if (presetId === "custom") {
    return null;
  }

  const preset = truthOrDarePresets.find((entry) => entry.id === presetId);
  if (!preset) {
    return null;
  }

  return {
    promptPackIds: preset.promptPackIds,
    promptMode: preset.promptMode,
  };
}
