import { describe, expect, it } from "vitest";

import {
  getDefaultWordPackIds,
  getWordPacksForLocale,
} from "./index";
import { pickWordPair } from "../engine/pick-word-pair";

const CORE_MIN_PAIRS = 200;
const THEME_MIN_PAIRS = 50;
const THEME_PACK_IDS = new Set(["anime", "movies", "music"]);

describe("word packs", () => {
  it("returns english packs for en locale", () => {
    const packs = getWordPacksForLocale("en");
    expect(packs.map((pack) => pack.id)).toEqual([
      "general",
      "food",
      "animals",
      "places",
      "anime",
      "movies",
      "music",
    ]);
  });

  it("returns italian packs for it locale", () => {
    const packs = getWordPacksForLocale("it");
    expect(packs[0]?.pairs[0]?.crewWord).toBe("Pizza");
  });

  it("defaults to all pack ids", () => {
    expect(getDefaultWordPackIds("en")).toHaveLength(7);
  });

  it("picks a pair from selected packs only", () => {
    const packs = getWordPacksForLocale("en");
    const pair = pickWordPair(packs, ["food"]);
    const foodPairs = packs.find((pack) => pack.id === "food")?.pairs ?? [];

    expect(foodPairs.some((entry) => entry.crewWord === pair.crewWord)).toBe(
      true,
    );
  });

  it("picks a pair from themed packs", () => {
    const packs = getWordPacksForLocale("en");
    const pair = pickWordPair(packs, ["anime"]);
    const animePairs = packs.find((pack) => pack.id === "anime")?.pairs ?? [];

    expect(animePairs.some((entry) => entry.crewWord === pair.crewWord)).toBe(
      true,
    );
  });

  it.each(["en", "it"] as const)(
    "meets minimum pair counts per pack for %s",
    (locale) => {
      const packs = getWordPacksForLocale(locale);

      for (const pack of packs) {
        const minPairs = THEME_PACK_IDS.has(pack.id)
          ? THEME_MIN_PAIRS
          : CORE_MIN_PAIRS;
        expect(pack.pairs.length).toBeGreaterThanOrEqual(minPairs);
      }
    },
  );
});
