import { z } from "zod";

export const QuestionImpostorConfigSchema = z.object({
  impostorCount: z.number().int().min(1),
  questionPackIds: z.array(z.string()).min(1),
  locale: z.string().min(2),
});

export type QuestionImpostorConfigInput = z.infer<
  typeof QuestionImpostorConfigSchema
>;

export function validateQuestionImpostorConfig(
  config: QuestionImpostorConfigInput,
  playerCount: number,
): string | null {
  const parsed = QuestionImpostorConfigSchema.safeParse(config);
  if (!parsed.success) {
    return "invalidConfig";
  }

  const { impostorCount } = parsed.data;

  if (impostorCount >= playerCount) {
    return "noCivilians";
  }

  if (impostorCount > Math.floor(playerCount / 2)) {
    return "tooManyImpostors";
  }

  return null;
}
