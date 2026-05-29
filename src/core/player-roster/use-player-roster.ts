"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { storage, type StoragePort } from "@/core/storage";

import { PlayerRosterRepository } from "./repository";

export function usePlayerRoster(storagePort: StoragePort = storage) {
  const repository = useMemo(
    () => new PlayerRosterRepository(storagePort),
    [storagePort],
  );
  const [players, setPlayers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPlayers(repository.getAll());
    setIsLoading(false);
  }, [repository]);

  const addPlayer = useCallback(
    (name: string) => {
      setPlayers(repository.add(name));
    },
    [repository],
  );

  const removePlayer = useCallback(
    (index: number) => {
      setPlayers(repository.removeAt(index));
    },
    [repository],
  );

  const renamePlayer = useCallback(
    (index: number, newName: string) => {
      setPlayers(repository.renameAt(index, newName));
    },
    [repository],
  );

  return {
    players,
    isLoading,
    addPlayer,
    removePlayer,
    renamePlayer,
  };
}
