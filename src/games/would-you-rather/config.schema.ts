import { z } from "zod";

export const WouldYouRatherConfigSchema = z.object({
  promptPackIds: z.array(z.string()).min(1),
  locale: z.string().min(2),
});

export type WouldYouRatherConfigInput = z.infer<
  typeof WouldYouRatherConfigSchema
>;

export function validateWouldYouRatherConfig(
  config: WouldYouRatherConfigInput,
  playerCount: number,
  minPlayers: number,
  maxPlayers: number,
): string | null {
  const parsed = WouldYouRatherConfigSchema.safeParse(config);
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
