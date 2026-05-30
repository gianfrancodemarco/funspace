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
  showPlayerPicker: boolean;
};

export const truthOrDarePresets: TruthOrDarePreset[] = [
  {
    id: "classic",
    nameKey: "truthOrDare.presets.classic",
    promptPackIds: ["classic"],
    promptMode: "both",
    showPlayerPicker: false,
  },
  {
    id: "sillyNight",
    nameKey: "truthOrDare.presets.sillyNight",
    promptPackIds: ["classic", "silly"],
    promptMode: "both",
    showPlayerPicker: true,
  },
  {
    id: "daresOnly",
    nameKey: "truthOrDare.presets.daresOnly",
    promptPackIds: ["classic", "silly"],
    promptMode: "dare_only",
    showPlayerPicker: true,
  },
  {
    id: "allAges",
    nameKey: "truthOrDare.presets.allAges",
    promptPackIds: ["classic", "silly"],
    promptMode: "both",
    showPlayerPicker: false,
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
    showPlayerPicker: preset.showPlayerPicker,
  };
}
