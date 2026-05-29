import { z } from "zod";

export const ImpostorConfigSchema = z.object({
  impostorCount: z.number().int().min(1),
  spyCount: z.number().int().min(0),
  wordPackIds: z.array(z.string()).min(1),
  locale: z.string().min(2),
});

export type ImpostorConfigInput = z.infer<typeof ImpostorConfigSchema>;

export function validateImpostorConfig(
  config: ImpostorConfigInput,
  playerCount: number,
): string | null {
  const parsed = ImpostorConfigSchema.safeParse(config);
  if (!parsed.success) {
    return "invalidConfig";
  }

  const { impostorCount, spyCount } = parsed.data;

  if (impostorCount + spyCount >= playerCount) {
    return "noCivilians";
  }

  if (impostorCount > Math.floor(playerCount / 2)) {
    return "tooManyImpostors";
  }

  if (spyCount > Math.floor(playerCount / 3)) {
    return "tooManySpies";
  }

  return null;
}
