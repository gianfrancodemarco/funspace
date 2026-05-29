export type NeverHaveIEverGameStatus = "playing" | "complete";

export type NeverHaveIEverConfig = {
  promptPackIds: string[];
  locale: string;
};

export type NeverHaveIEverGameState = {
  config: NeverHaveIEverConfig;
  deck: string[];
  currentIndex: number;
  skippedCount: number;
  status: NeverHaveIEverGameStatus;
};

export const NEVER_HAVE_I_EVER_STATE_KEY = "neverHaveIEverState";

export function getNeverHaveIEverState(
  secrets: Record<string, unknown>,
): NeverHaveIEverGameState | null {
  const state = secrets[NEVER_HAVE_I_EVER_STATE_KEY];
  if (!state || typeof state !== "object") {
    return null;
  }
  return state as NeverHaveIEverGameState;
}

export function getPromptsShown(state: NeverHaveIEverGameState): number {
  return Math.min(state.currentIndex + 1, state.deck.length);
}
