import { describe, expect, it } from "vitest";

import { getDilemmaDecksForLocale } from "../dilemma-decks";
import type { WouldYouRatherGameState } from "../types";
import {
  advanceDilemma,
  buildDeck,
  endSession,
  getCurrentDilemma,
  shuffleDeck,
} from "./index";

function createState(
  deck: WouldYouRatherGameState["deck"],
  currentIndex = 0,
): WouldYouRatherGameState {
  return {
    config: {
      promptPackIds: ["classic"],
      locale: "en",
    },
    deck,
    currentIndex,
    skippedCount: 0,
    status: "playing",
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

describe("buildDeck", () => {
  it("merges dilemmas from selected packs without duplicates", () => {
    const decks = getDilemmaDecksForLocale("en");
    const built = buildDeck(decks, ["classic", "gross"]);
    expect(built.length).toBeGreaterThan(50);
    const keys = built.map((d) => `${d.optionA}|${d.optionB}`);
    expect(new Set(keys).size).toBe(built.length);
  });
});

describe("advanceDilemma", () => {
  it("advances to the next dilemma", () => {
    const state = createState([
      { optionA: "A1", optionB: "B1" },
      { optionA: "A2", optionB: "B2" },
      { optionA: "A3", optionB: "B3" },
    ]);
    const { state: nextState, result } = advanceDilemma(state);

    expect(result).toBe("continue");
    expect(nextState.currentIndex).toBe(1);
    expect(getCurrentDilemma(nextState)).toEqual({
      optionA: "A2",
      optionB: "B2",
    });
  });

  it("increments skipped count when skipping", () => {
    const state = createState([
      { optionA: "A1", optionB: "B1" },
      { optionA: "A2", optionB: "B2" },
    ]);
    const { state: nextState } = advanceDilemma(state, { skipped: true });

    expect(nextState.skippedCount).toBe(1);
  });

  it("does not repeat dilemmas within a session", () => {
    const deck = [
      { optionA: "A1", optionB: "B1" },
      { optionA: "A2", optionB: "B2" },
    ];
    let state = createState(deck);
    const seen = new Set<string>();

    while (state.status === "playing") {
      const dilemma = getCurrentDilemma(state);
      expect(dilemma).toBeTruthy();
      seen.add(`${dilemma!.optionA}|${dilemma!.optionB}`);
      ({ state } = advanceDilemma(state));
    }

    expect(seen.size).toBe(deck.length);
  });

  it("completes when the deck is exhausted", () => {
    const state = createState([{ optionA: "only", optionB: "choice" }], 0);
    const { state: nextState, result } = advanceDilemma(state);

    expect(result).toBe("complete");
    expect(nextState.status).toBe("complete");
  });
});

describe("endSession", () => {
  it("marks the session complete early", () => {
    const state = createState([
      { optionA: "A1", optionB: "B1" },
      { optionA: "A2", optionB: "B2" },
      { optionA: "A3", optionB: "B3" },
    ]);
    const ended = endSession(state);

    expect(ended.status).toBe("complete");
    expect(ended.currentIndex).toBe(0);
  });
});
