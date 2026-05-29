import { describe, expect, it } from "vitest";

import {
  getDefaultQuestionPackIds,
  getQuestionPacksForLocale,
} from "./index";
import { pickQuestionPair } from "../engine/pick-question-pair";

describe("question packs", () => {
  it("returns English packs by default", () => {
    const packs = getQuestionPacksForLocale("en");
    expect(packs.length).toBeGreaterThanOrEqual(4);
    expect(packs[0].pairs.length).toBeGreaterThanOrEqual(8);
  });

  it("returns Italian packs for it locale", () => {
    const packs = getQuestionPacksForLocale("it");
    expect(packs[0].pairs[0].crewQuestion).toMatch(/Quanti|Quante|Preferisci|In che/i);
  });

  it("defaults to all pack ids", () => {
    const ids = getDefaultQuestionPackIds("en");
    expect(ids).toContain("general");
    expect(ids).toContain("pop-culture");
  });

  it("picks from selected packs only", () => {
    const packs = getQuestionPacksForLocale("en");
    const pair = pickQuestionPair(packs, ["numbers"]);
    expect(pair.crewQuestion).toBeTruthy();
    expect(pair.answerType).toBeTruthy();
  });
});
