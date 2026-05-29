import { beforeEach, describe, expect, it } from "vitest";

import { LocalStorageAdapter } from "./local-storage-adapter";

function createMockStorage(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key) => store.get(key) ?? null,
    key: (index) => [...store.keys()][index] ?? null,
    removeItem: (key) => {
      store.delete(key);
    },
    setItem: (key, value) => {
      store.set(key, value);
    },
  };
}

describe("LocalStorageAdapter", () => {
  let adapter: LocalStorageAdapter;

  beforeEach(() => {
    adapter = new LocalStorageAdapter(createMockStorage());
  });

  it("returns null for missing keys", () => {
    expect(adapter.get<string[]>("funspace:missing")).toBeNull();
  });

  it("stores and retrieves JSON values", () => {
    adapter.set("funspace:test", ["Marco", "Giulia"]);

    expect(adapter.get<string[]>("funspace:test")).toEqual(["Marco", "Giulia"]);
  });

  it("removes stored keys", () => {
    adapter.set("funspace:test", { ok: true });
    adapter.remove("funspace:test");

    expect(adapter.get("funspace:test")).toBeNull();
  });

  it("returns null for invalid JSON", () => {
    const mockStorage = createMockStorage();
    mockStorage.setItem("funspace:bad", "{not-json");

    const invalidAdapter = new LocalStorageAdapter(mockStorage);

    expect(invalidAdapter.get("funspace:bad")).toBeNull();
  });
});
