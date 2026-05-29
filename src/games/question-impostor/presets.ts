import type { QuestionImpostorConfigInput } from "./config.schema";

export type QuestionImpostorPresetId =
  | "classic"
  | "two-impostors"
  | "chaos"
  | "custom";

export type QuestionImpostorPreset = {
  id: Exclude<QuestionImpostorPresetId, "custom">;
  nameKey: string;
  impostorCount: number;
};

export const questionImpostorPresets: QuestionImpostorPreset[] = [
  {
    id: "classic",
    nameKey: "questionImpostor.presets.classic",
    impostorCount: 1,
  },
  {
    id: "two-impostors",
    nameKey: "questionImpostor.presets.twoImpostors",
    impostorCount: 2,
  },
  {
    id: "chaos",
    nameKey: "questionImpostor.presets.chaos",
    impostorCount: 2,
  },
];

export function getPresetConfig(
  presetId: QuestionImpostorPresetId,
): Pick<QuestionImpostorConfigInput, "impostorCount"> {
  if (presetId === "custom") {
    return { impostorCount: 1 };
  }

  const preset = questionImpostorPresets.find((entry) => entry.id === presetId);
  return {
    impostorCount: preset?.impostorCount ?? 1,
  };
}
