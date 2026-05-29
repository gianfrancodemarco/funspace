import { z } from "zod";

export const HangmanConfigSchema = z.object({
  wordPackIds: z.array(z.string()).min(1),
  maxWrongGuesses: z.number().int().min(4).max(10),
  locale: z.string().min(2),
});

export type HangmanConfigInput = z.infer<typeof HangmanConfigSchema>;

export function validateHangmanConfig(
  config: HangmanConfigInput,
  playerCount: number,
  minPlayers: number,
  maxPlayers: number,
): string | null {
  const parsed = HangmanConfigSchema.safeParse(config);
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
