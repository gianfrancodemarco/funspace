import { describe, expect, it } from "vitest";

import { validateQuestionImpostorConfig } from "./config.schema";

describe("validateQuestionImpostorConfig", () => {
  it("rejects when impostors leave no civilians", () => {
    expect(
      validateQuestionImpostorConfig(
        { impostorCount: 3, questionPackIds: ["general"], locale: "en" },
        3,
      ),
    ).toBe("noCivilians");
  });

  it("rejects too many impostors", () => {
    expect(
      validateQuestionImpostorConfig(
        { impostorCount: 3, questionPackIds: ["general"], locale: "en" },
        5,
      ),
    ).toBe("tooManyImpostors");
  });

  it("accepts valid config", () => {
    expect(
      validateQuestionImpostorConfig(
        { impostorCount: 1, questionPackIds: ["general"], locale: "en" },
        5,
      ),
    ).toBeNull();
  });
});
