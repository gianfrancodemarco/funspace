import { describe, expect, it } from "vitest";

import { validateImpostorConfig } from "./config.schema";

describe("impostor config validation", () => {
  it("rejects configs without civilians", () => {
    expect(
      validateImpostorConfig(
        {
          impostorCount: 2,
          spyCount: 1,
          wordPackIds: ["general"],
          locale: "en",
        },
        3,
      ),
    ).toBe("noCivilians");
  });

  it("accepts valid classic config", () => {
    expect(
      validateImpostorConfig(
        {
          impostorCount: 1,
          spyCount: 0,
          wordPackIds: ["general"],
          locale: "en",
        },
        4,
      ),
    ).toBeNull();
  });
});
