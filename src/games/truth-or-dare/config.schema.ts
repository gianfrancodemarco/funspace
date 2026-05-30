import { z } from "zod";

export const TruthOrDareConfigSchema = z.object({
  promptPackIds: z.array(z.string()).min(1),
  promptMode: z.enum(["both", "truth_only", "dare_only", "random"]),
  locale: z.string().min(2),
});

export type TruthOrDareConfigInput = z.infer<typeof TruthOrDareConfigSchema>;

export function validateTruthOrDareConfig(
  config: TruthOrDareConfigInput,
  playerCount: number,
  minPlayers: number,
  maxPlayers: number,
): string | null {
  const parsed = TruthOrDareConfigSchema.safeParse(config);
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
