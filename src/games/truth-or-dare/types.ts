export type PromptMode = "both" | "truth_only" | "dare_only" | "random";
export type PromptType = "truth" | "dare";
export type TurnPhase = "choosing" | "showing";
export type TruthOrDareGameStatus = "playing" | "complete";

export type TruthOrDareConfig = {
  promptPackIds: string[];
  promptMode: PromptMode;
  locale: string;
};

export type TruthOrDareGameState = {
  config: TruthOrDareConfig;
  truthDeck: string[];
  dareDeck: string[];
  truthIndex: number;
  dareIndex: number;
  truthsPlayed: number;
  daresPlayed: number;
  turnOrder: string[];
  currentTurnIndex: number;
  skipCountsByPlayerId: Record<string, number>;
  status: TruthOrDareGameStatus;
  turnPhase: TurnPhase;
  currentType?: PromptType;
};

export const TRUTH_OR_DARE_STATE_KEY = "truthOrDareState";

export function getTruthOrDareState(
  secrets: Record<string, unknown>,
): TruthOrDareGameState | null {
  const state = secrets[TRUTH_OR_DARE_STATE_KEY];
  if (!state || typeof state !== "object") {
    return null;
  }
  return state as TruthOrDareGameState;
}
