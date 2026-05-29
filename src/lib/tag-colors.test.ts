import { describe, expect, it } from "vitest";

import { getTagColorClass } from "@/lib/tag-colors";

describe("getTagColorClass", () => {
  it("returns category-specific classes for known tags", () => {
    expect(getTagColorClass("deduction")).toContain("purple");
    expect(getTagColorClass("bluff")).toContain("orange");
    expect(getTagColorClass("words")).toContain("sky");
    expect(getTagColorClass("social")).toContain("pink");
    expect(getTagColorClass("quick")).toContain("teal");
  });

  it("returns default class for unknown tags", () => {
    expect(getTagColorClass("unknown")).toBe(
      "bg-secondary text-secondary-foreground",
    );
  });
});
