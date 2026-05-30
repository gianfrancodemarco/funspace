import { describe, expect, it } from "vitest";

import { getPromptDecksForLocale } from "../prompt-decks";
import type { TruthOrDareGameState } from "../types";
import {
  advancePrompt,
  buildDecks,
  choosePromptType,
  createGameState,
  endSession,
  getAvailableTypes,
  getCurrentPrompt,
  isSessionExhausted,
  pickRandomType,
  shuffleDeck,
} from "./index";

function createConfig(mode: TruthOrDareGameState["config"]["promptMode"] = "both") {
  return {
    promptPackIds: ["classic"],
    promptMode: mode,
    showPlayerPicker: false,
    locale: "en",
  };
}

function createState(
  overrides: Partial<TruthOrDareGameState> = {},
): TruthOrDareGameState {
  return {
    config: createConfig(),
    truthDeck: ["truth one", "truth two"],
    dareDeck: ["dare one", "dare two"],
    truthIndex: 0,
    dareIndex: 0,
    truthsPlayed: 0,
    daresPlayed: 0,
    skippedCount: 0,
    status: "playing",
    turnPhase: "showing",
    currentType: "truth",
    ...overrides,
  };
}

describe("shuffleDeck", () => {
  it("returns a permutation of the input", () => {
    const input = ["a", "b", "c", "d", "e"];
    const shuffled = shuffleDeck(input);
    expect(shuffled).toHaveLength(input.length);
    expect([...shuffled].sort()).toEqual(input);
    expect(input).toEqual(["a", "b", "c", "d", "e"]);
  });
});

describe("buildDecks", () => {
  it("merges truths and dares from selected packs without duplicates", () => {
    const packs = getPromptDecksForLocale("en");
    const built = buildDecks(packs, ["classic", "silly"]);
    expect(built.truthDeck.length).toBeGreaterThan(26);
    expect(built.dareDeck.length).toBeGreaterThan(26);
    expect(new Set(built.truthDeck).size).toBe(built.truthDeck.length);
    expect(new Set(built.dareDeck).size).toBe(built.dareDeck.length);
  });
});

describe("createGameState", () => {
  it("starts in choosing phase for both mode", () => {
    const state = createGameState(createConfig("both"), ["t1"], ["d1"]);
    expect(state.turnPhase).toBe("choosing");
    expect(state.currentType).toBeUndefined();
  });

  it("auto-starts showing for truth only mode", () => {
    const state = createGameState(createConfig("truth_only"), ["t1"], ["d1"]);
    expect(state.turnPhase).toBe("showing");
    expect(state.currentType).toBe("truth");
    expect(getCurrentPrompt(state)).toBe("t1");
  });
});

describe("choosePromptType", () => {
  it("shows a truth prompt in both mode", () => {
    const state = createState({
      turnPhase: "choosing",
      currentType: undefined,
    });
    const next = choosePromptType(state, "truth");
    expect(next.turnPhase).toBe("showing");
    expect(next.currentType).toBe("truth");
    expect(getCurrentPrompt(next)).toBe("truth one");
  });
});

describe("advancePrompt", () => {
  it("advances truth deck and returns to choosing in both mode", () => {
    const state = createState();
    const { state: nextState, result } = advancePrompt(state);

    expect(result).toBe("continue");
    expect(nextState.truthIndex).toBe(1);
    expect(nextState.truthsPlayed).toBe(1);
    expect(nextState.turnPhase).toBe("choosing");
  });

  it("increments skipped count when skipping", () => {
    const state = createState();
    const { state: nextState } = advancePrompt(state, { skipped: true });

    expect(nextState.skippedCount).toBe(1);
    expect(nextState.truthsPlayed).toBe(0);
  });

  it("completes when the applicable deck is exhausted in truth only mode", () => {
    const state = createState({
      config: createConfig("truth_only"),
      truthDeck: ["only"],
      dareDeck: [],
      currentType: "truth",
    });
    const { state: nextState, result } = advancePrompt(state);

    expect(result).toBe("complete");
    expect(nextState.status).toBe("complete");
  });
});

describe("random mode pool fallback", () => {
  it("uses the remaining pool when one deck is exhausted", () => {
    const state = createState({
      config: createConfig("random"),
      truthDeck: [],
      dareDeck: ["dare one"],
      truthIndex: 0,
      dareIndex: 0,
      turnPhase: "choosing",
      currentType: undefined,
    });

    expect(getAvailableTypes(state)).toEqual(["dare"]);
    expect(pickRandomType(state)).toBe("dare");
    expect(isSessionExhausted(state)).toBe(false);
  });
});

describe("endSession", () => {
  it("marks the session complete early", () => {
    const state = createState();
    const ended = endSession(state);

    expect(ended.status).toBe("complete");
    expect(ended.currentType).toBeUndefined();
  });
});
