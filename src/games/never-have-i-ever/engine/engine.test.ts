import { describe, expect, it } from "vitest";

import { getPromptDecksForLocale } from "../prompt-decks";
import type { NeverHaveIEverGameState } from "../types";
import {
  advancePrompt,
  buildDeck,
  endSession,
  getCurrentPrompt,
  shuffleDeck,
} from "./index";

function createState(deck: string[], currentIndex = 0): NeverHaveIEverGameState {
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
  it("merges prompts from selected packs without duplicates", () => {
    const decks = getPromptDecksForLocale("en");
    const built = buildDeck(decks, ["classic", "travel"]);
    expect(built.length).toBeGreaterThan(32);
    expect(new Set(built).size).toBe(built.length);
  });
});

describe("advancePrompt", () => {
  it("advances to the next prompt", () => {
    const state = createState(["one", "two", "three"]);
    const { state: nextState, result } = advancePrompt(state);

    expect(result).toBe("continue");
    expect(nextState.currentIndex).toBe(1);
    expect(getCurrentPrompt(nextState)).toBe("two");
  });

  it("increments skipped count when skipping", () => {
    const state = createState(["one", "two"]);
    const { state: nextState } = advancePrompt(state, { skipped: true });

    expect(nextState.skippedCount).toBe(1);
  });

  it("does not repeat prompts within a session", () => {
    const deck = ["one", "two"];
    let state = createState(deck);
    const seen = new Set<string>();

    while (state.status === "playing") {
      const prompt = getCurrentPrompt(state);
      expect(prompt).toBeTruthy();
      seen.add(prompt!);
      ({ state } = advancePrompt(state));
    }

    expect(seen.size).toBe(deck.length);
  });

  it("completes when the deck is exhausted", () => {
    const state = createState(["only"], 0);
    const { state: nextState, result } = advancePrompt(state);

    expect(result).toBe("complete");
    expect(nextState.status).toBe("complete");
  });
});

describe("endSession", () => {
  it("marks the session complete early", () => {
    const state = createState(["one", "two", "three"]);
    const ended = endSession(state);

    expect(ended.status).toBe("complete");
    expect(ended.currentIndex).toBe(0);
  });
});
