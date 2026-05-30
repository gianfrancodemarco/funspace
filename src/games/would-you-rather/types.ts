export type WouldYouRatherDilemma = {
  optionA: string;
  optionB: string;
};

export type WouldYouRatherGameStatus = "playing" | "complete";

export type WouldYouRatherConfig = {
  promptPackIds: string[];
  locale: string;
};

export type WouldYouRatherGameState = {
  config: WouldYouRatherConfig;
  deck: WouldYouRatherDilemma[];
  currentIndex: number;
  skippedCount: number;
  status: WouldYouRatherGameStatus;
};

export const WOULD_YOU_RATHER_STATE_KEY = "wouldYouRatherState";

export function getWouldYouRatherState(
  secrets: Record<string, unknown>,
): WouldYouRatherGameState | null {
  const state = secrets[WOULD_YOU_RATHER_STATE_KEY];
  if (!state || typeof state !== "object") {
    return null;
  }
  return state as WouldYouRatherGameState;
}

export function getDilemmasShown(state: WouldYouRatherGameState): number {
  return Math.min(state.currentIndex + 1, state.deck.length);
}

export function dilemmaKey(dilemma: WouldYouRatherDilemma): string {
  return `${dilemma.optionA}|${dilemma.optionB}`;
}
