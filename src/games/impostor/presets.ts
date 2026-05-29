import type { ImpostorConfigInput } from "./config.schema";

export type ImpostorPresetId = "classic" | "with-spy" | "chaos" | "custom";

export type ImpostorPreset = {
  id: ImpostorPresetId;
  nameKey: string;
  impostorCount: number;
  spyCount: number;
};

export const impostorPresets: ImpostorPreset[] = [
  {
    id: "classic",
    nameKey: "impostor.presets.classic",
    impostorCount: 1,
    spyCount: 0,
  },
  {
    id: "with-spy",
    nameKey: "impostor.presets.withSpy",
    impostorCount: 1,
    spyCount: 1,
  },
  {
    id: "chaos",
    nameKey: "impostor.presets.chaos",
    impostorCount: 2,
    spyCount: 0,
  },
];

export function getPresetConfig(
  presetId: ImpostorPresetId,
): Pick<ImpostorConfigInput, "impostorCount" | "spyCount"> {
  if (presetId === "custom") {
    return { impostorCount: 1, spyCount: 0 };
  }

  const preset = impostorPresets.find((entry) => entry.id === presetId);
  return {
    impostorCount: preset?.impostorCount ?? 1,
    spyCount: preset?.spyCount ?? 0,
  };
}
