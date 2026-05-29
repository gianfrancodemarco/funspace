import type { NeverHaveIEverGameState } from "../types";

export type AdvanceResult = "continue" | "complete";

export function getCurrentPrompt(state: NeverHaveIEverGameState): string | null {
  if (state.currentIndex >= state.deck.length) {
    return null;
  }

  return state.deck[state.currentIndex] ?? null;
}

export function advancePrompt(
  state: NeverHaveIEverGameState,
  options: { skipped?: boolean } = {},
): { state: NeverHaveIEverGameState; result: AdvanceResult } {
  if (state.status !== "playing") {
    return { state, result: "complete" };
  }

  const nextIndex = state.currentIndex + 1;
  const nextState: NeverHaveIEverGameState = {
    ...state,
    currentIndex: nextIndex,
    skippedCount: state.skippedCount + (options.skipped ? 1 : 0),
    status: nextIndex >= state.deck.length ? "complete" : "playing",
  };

  return {
    state: nextState,
    result: nextState.status === "complete" ? "complete" : "continue",
  };
}

export function endSession(
  state: NeverHaveIEverGameState,
): NeverHaveIEverGameState {
  if (state.status === "complete") {
    return state;
  }

  return {
    ...state,
    status: "complete",
  };
}
