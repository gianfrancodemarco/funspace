import { LocalStorageAdapter } from "./local-storage-adapter";
import type { StoragePort } from "./port";

function createMemoryStoragePort(): StoragePort {
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

let browserStorage: LocalStorageAdapter | null = null;

export function getStorage(): StoragePort {
  if (typeof window === "undefined") {
    return createMemoryStoragePort();
  }

  if (!browserStorage) {
    browserStorage = new LocalStorageAdapter();
  }

  return browserStorage;
}

export const storage = new Proxy({} as StoragePort, {
  get(_target, property) {
    const value = getStorage()[property as keyof StoragePort];
    return typeof value === "function" ? value.bind(getStorage()) : value;
  },
});
