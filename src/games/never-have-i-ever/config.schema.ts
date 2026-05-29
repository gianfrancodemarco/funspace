import { z } from "zod";

export const NeverHaveIEverConfigSchema = z.object({
  promptPackIds: z.array(z.string()).min(1),
  locale: z.string().min(2),
});

export type NeverHaveIEverConfigInput = z.infer<
  typeof NeverHaveIEverConfigSchema
>;

export function validateNeverHaveIEverConfig(
  config: NeverHaveIEverConfigInput,
  playerCount: number,
  minPlayers: number,
  maxPlayers: number,
): string | null {
  const parsed = NeverHaveIEverConfigSchema.safeParse(config);
  if (!parsed.success) {
    return "invalidConfig";
  }

  if (playerCount < minPlayers) {
    return "tooFew";
  }

  if (playerCount > maxPlayers) {
    return "tooMany";
  }

  return null;
}
