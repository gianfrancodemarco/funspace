import { beforeEach, describe, expect, it } from "vitest";

import type { StoragePort } from "@/core/storage";
import { STORAGE_KEYS } from "@/core/storage";

import { PlayerRosterRepository } from "./repository";

function createMemoryStorage(): StoragePort {
  const store = new Map<string, unknown>();

  return {
    get<T>(key: string) {
      return (store.get(key) as T | undefined) ?? null;
    },
    set<T>(key: string, value: T) {
      store.set(key, value);
    },
    remove(key: string) {
      store.delete(key);
    },
  };
}

describe("PlayerRosterRepository", () => {
  let storage: StoragePort;
  let repository: PlayerRosterRepository;

  beforeEach(() => {
    storage = createMemoryStorage();
    repository = new PlayerRosterRepository(storage);
  });

  it("returns an empty roster by default", () => {
    expect(repository.getAll()).toEqual([]);
  });

  it("adds players and persists them", () => {
    repository.add("Marco");
    repository.add("Giulia");

    expect(repository.getAll()).toEqual(["Marco", "Giulia"]);
    expect(storage.get(STORAGE_KEYS.playerRoster)).toEqual(["Marco", "Giulia"]);
  });

  it("ignores empty add operations", () => {
    repository.add("   ");

    expect(repository.getAll()).toEqual([]);
  });

  it("removes a player by index", () => {
    repository.add("Marco");
    repository.add("Giulia");

    repository.removeAt(0);

    expect(repository.getAll()).toEqual(["Giulia"]);
  });

  it("renames a player by index", () => {
    repository.add("Marco");

    repository.renameAt(0, "Luca");

    expect(repository.getAll()).toEqual(["Luca"]);
  });

  it("returns empty roster for invalid stored data", () => {
    storage.set(STORAGE_KEYS.playerRoster, ["", "bad"]);

    expect(repository.getAll()).toEqual([]);
  });
});
