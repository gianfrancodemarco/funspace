export type QuestionImpostorRole = "civilian" | "impostor";

export type AnswerType = "number" | "year" | "yes_no" | "duration";

export type QuestionPair = {
  crewQuestion: string;
  impostorQuestion: string;
  answerType: AnswerType;
  crewAnswer?: string;
  impostorAnswer?: string;
};

export type QuestionImpostorConfig = {
  impostorCount: number;
  questionPackIds: string[];
  locale: string;
};

export type QuestionImpostorGameState = {
  roles: Record<string, QuestionImpostorRole>;
  pair: QuestionPair;
  alivePlayerIds: string[];
  eliminatedPlayerIds: string[];
  winner?: "civilians" | "impostors";
};

export const QUESTION_IMPOSTOR_STATE_KEY = "questionImpostorState";

export function getQuestionImpostorState(
  secrets: Record<string, unknown>,
): QuestionImpostorGameState | null {
  const state = secrets[QUESTION_IMPOSTOR_STATE_KEY];
  if (!state || typeof state !== "object") {
    return null;
  }
  return state as QuestionImpostorGameState;
}
