import type { WouldYouRatherDilemma, WouldYouRatherGameState } from "../types";

export type AdvanceResult = "continue" | "complete";

export function getCurrentDilemma(
  state: WouldYouRatherGameState,
): WouldYouRatherDilemma | null {
  if (state.currentIndex >= state.deck.length) {
    return null;
  }

  return state.deck[state.currentIndex] ?? null;
}

export function advanceDilemma(
  state: WouldYouRatherGameState,
  options: { skipped?: boolean } = {},
): { state: WouldYouRatherGameState; result: AdvanceResult } {
  if (state.status !== "playing") {
    return { state, result: "complete" };
  }

  const nextIndex = state.currentIndex + 1;
  const nextState: WouldYouRatherGameState = {
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
  state: WouldYouRatherGameState,
): WouldYouRatherGameState {
  if (state.status === "complete") {
    return state;
  }

  return {
    ...state,
    status: "complete",
  };
}
