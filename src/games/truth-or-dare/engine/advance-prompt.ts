import type {
  PromptType,
  TruthOrDareConfig,
  TruthOrDareGameState,
} from "../types";

export type AdvanceResult = "continue" | "complete";

export function isTypeAvailable(
  state: TruthOrDareGameState,
  type: PromptType,
): boolean {
  if (type === "truth") {
    return state.truthIndex < state.truthDeck.length;
  }
  return state.dareIndex < state.dareDeck.length;
}

export function getAvailableTypes(state: TruthOrDareGameState): PromptType[] {
  const types: PromptType[] = [];
  if (isTypeAvailable(state, "truth")) {
    types.push("truth");
  }
  if (isTypeAvailable(state, "dare")) {
    types.push("dare");
  }
  return types;
}

export function isSessionExhausted(state: TruthOrDareGameState): boolean {
  const { promptMode } = state.config;
  if (promptMode === "truth_only") {
    return !isTypeAvailable(state, "truth");
  }
  if (promptMode === "dare_only") {
    return !isTypeAvailable(state, "dare");
  }
  return getAvailableTypes(state).length === 0;
}

export function getCurrentPrompt(state: TruthOrDareGameState): string | null {
  if (state.turnPhase !== "showing" || !state.currentType) {
    return null;
  }

  if (state.currentType === "truth") {
    return state.truthDeck[state.truthIndex] ?? null;
  }

  return state.dareDeck[state.dareIndex] ?? null;
}

export function pickRandomType(state: TruthOrDareGameState): PromptType | null {
  const available = getAvailableTypes(state);
  if (available.length === 0) {
    return null;
  }
  return available[Math.floor(Math.random() * available.length)] ?? null;
}

export function choosePromptType(
  state: TruthOrDareGameState,
  type: PromptType,
): TruthOrDareGameState {
  if (
    state.status !== "playing" ||
    state.turnPhase !== "choosing" ||
    !isTypeAvailable(state, type)
  ) {
    return state;
  }

  return {
    ...state,
    turnPhase: "showing",
    currentType: type,
  };
}

export function beginNextTurn(
  state: TruthOrDareGameState,
): { state: TruthOrDareGameState; result: AdvanceResult } {
  if (isSessionExhausted(state)) {
    return {
      state: { ...state, status: "complete", turnPhase: "choosing", currentType: undefined },
      result: "complete",
    };
  }

  const { promptMode } = state.config;

  if (promptMode === "both") {
    return {
      state: {
        ...state,
        turnPhase: "choosing",
        currentType: undefined,
      },
      result: "continue",
    };
  }

  if (promptMode === "truth_only") {
    return {
      state: {
        ...state,
        turnPhase: "showing",
        currentType: "truth",
      },
      result: "continue",
    };
  }

  if (promptMode === "dare_only") {
    return {
      state: {
        ...state,
        turnPhase: "showing",
        currentType: "dare",
      },
      result: "continue",
    };
  }

  const type = pickRandomType(state);
  if (!type) {
    return {
      state: { ...state, status: "complete", turnPhase: "choosing", currentType: undefined },
      result: "complete",
    };
  }

  return {
    state: {
      ...state,
      turnPhase: "showing",
      currentType: type,
    },
    result: "continue",
  };
}

export function createGameState(
  config: TruthOrDareConfig,
  truthDeck: string[],
  dareDeck: string[],
): TruthOrDareGameState {
  const base: TruthOrDareGameState = {
    config,
    truthDeck,
    dareDeck,
    truthIndex: 0,
    dareIndex: 0,
    truthsPlayed: 0,
    daresPlayed: 0,
    skippedCount: 0,
    status: "playing",
    turnPhase: "choosing",
  };

  if (truthDeck.length === 0 && dareDeck.length === 0) {
    return { ...base, status: "complete" };
  }

  if (config.promptMode === "truth_only" && truthDeck.length === 0) {
    return { ...base, status: "complete" };
  }

  if (config.promptMode === "dare_only" && dareDeck.length === 0) {
    return { ...base, status: "complete" };
  }

  if (config.promptMode === "both") {
    if (isSessionExhausted(base)) {
      return { ...base, status: "complete" };
    }
    return { ...base, turnPhase: "choosing" };
  }

  return beginNextTurn(base).state;
}

export function advancePrompt(
  state: TruthOrDareGameState,
  options: { skipped?: boolean } = {},
): { state: TruthOrDareGameState; result: AdvanceResult } {
  if (state.status !== "playing" || state.turnPhase !== "showing" || !state.currentType) {
    return { state, result: state.status === "complete" ? "complete" : "continue" };
  }

  const type = state.currentType;
  let nextState: TruthOrDareGameState = {
    ...state,
    currentType: undefined,
    skippedCount: state.skippedCount + (options.skipped ? 1 : 0),
  };

  if (type === "truth") {
    nextState = {
      ...nextState,
      truthIndex: state.truthIndex + 1,
      truthsPlayed: state.truthsPlayed + (options.skipped ? 0 : 1),
    };
  } else {
    nextState = {
      ...nextState,
      dareIndex: state.dareIndex + 1,
      daresPlayed: state.daresPlayed + (options.skipped ? 0 : 1),
    };
  }

  if (isSessionExhausted(nextState)) {
    return {
      state: { ...nextState, status: "complete", turnPhase: "choosing" },
      result: "complete",
    };
  }

  return beginNextTurn(nextState);
}

export function endSession(state: TruthOrDareGameState): TruthOrDareGameState {
  if (state.status === "complete") {
    return state;
  }

  return {
    ...state,
    status: "complete",
    turnPhase: "choosing",
    currentType: undefined,
  };
}

export function selectPlayer(
  state: TruthOrDareGameState,
  playerId: string | undefined,
): TruthOrDareGameState {
  return {
    ...state,
    selectedPlayerId: playerId,
  };
}
