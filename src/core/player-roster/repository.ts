import { STORAGE_KEYS, type StoragePort } from "@/core/storage";

import { playerRosterSchema, type PlayerRoster } from "./schema";

export class PlayerRosterRepository {
  constructor(private readonly storage: StoragePort) {}

  getAll(): PlayerRoster {
    const stored = this.storage.get<unknown>(STORAGE_KEYS.playerRoster);
    const parsed = playerRosterSchema.safeParse(stored ?? []);

    return parsed.success ? parsed.data : [];
  }

  save(roster: PlayerRoster): PlayerRoster {
    this.storage.set(STORAGE_KEYS.playerRoster, roster);
    return roster;
  }

  add(name: string): PlayerRoster {
    const trimmed = name.trim();
    if (!trimmed) {
      return this.getAll();
    }

    return this.save([...this.getAll(), trimmed]);
  }

  removeAt(index: number): PlayerRoster {
    const roster = this.getAll();
    if (index < 0 || index >= roster.length) {
      return roster;
    }

    return this.save(roster.filter((_, i) => i !== index));
  }

  renameAt(index: number, newName: string): PlayerRoster {
    const trimmed = newName.trim();
    const roster = this.getAll();

    if (!trimmed || index < 0 || index >= roster.length) {
      return roster;
    }

    const next = [...roster];
    next[index] = trimmed;
    return this.save(next);
  }
}
