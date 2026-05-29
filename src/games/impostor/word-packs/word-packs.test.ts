import { describe, expect, it } from "vitest";

import {
  getDefaultWordPackIds,
  getWordPacksForLocale,
} from "./index";
import { pickWordPair } from "../engine/pick-word-pair";

describe("word packs", () => {
  it("returns english packs for en locale", () => {
    const packs = getWordPacksForLocale("en");
    expect(packs.map((pack) => pack.id)).toEqual([
      "general",
      "food",
      "animals",
      "places",
    ]);
  });

  it("returns italian packs for it locale", () => {
    const packs = getWordPacksForLocale("it");
    expect(packs[0]?.pairs[0]?.crewWord).toBe("Pizza");
  });

  it("defaults to all pack ids", () => {
    expect(getDefaultWordPackIds("en")).toHaveLength(4);
  });

  it("picks a pair from selected packs only", () => {
    const packs = getWordPacksForLocale("en");
    const pair = pickWordPair(packs, ["food"]);
    const foodPairs = packs.find((pack) => pack.id === "food")?.pairs ?? [];

    expect(foodPairs.some((entry) => entry.crewWord === pair.crewWord)).toBe(true);
  });
});
