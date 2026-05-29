import type { StoragePort } from "./port";

export class LocalStorageAdapter implements StoragePort {
  constructor(private readonly storage: Storage = globalThis.localStorage) {}

  get<T>(key: string): T | null {
    try {
      const raw = this.storage.getItem(key);
      if (raw === null) {
        return null;
      }

      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
