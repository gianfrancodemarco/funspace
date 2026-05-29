"use client";

import { useTranslations } from "next-intl";

import { PlayerRosterAddForm } from "@/components/players/PlayerRosterAddForm";
import { PlayerRosterList } from "@/components/players/PlayerRosterList";
import type { StoragePort } from "@/core/storage";
import { usePlayerRoster } from "@/core/player-roster";

type PlayerRosterPanelProps = {
  storagePort?: StoragePort;
};

export function PlayerRosterPanel({ storagePort }: PlayerRosterPanelProps) {
  const t = useTranslations("players");
  const { players, isLoading, addPlayer, removePlayer, renamePlayer } =
    usePlayerRoster(storagePort);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
      <section className="space-y-3">
        <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          {t("description")}
        </p>
      </section>

      <section className="space-y-6">
        <PlayerRosterAddForm onAdd={addPlayer} />

        {isLoading ? (
          <p className="text-muted-foreground text-sm">{t("loading")}</p>
        ) : (
          <PlayerRosterList
            players={players}
            onRemove={removePlayer}
            onRename={renamePlayer}
          />
        )}
      </section>
    </main>
  );
}
