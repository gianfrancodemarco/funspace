"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { usePlayerRoster } from "@/core/player-roster";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import type { GameStartInput } from "@/core/game-shell";

type PlayerSelectSetupProps = {
  minPlayers: number;
  maxPlayers: number;
  onStart: (input: GameStartInput) => void;
};

export function PlayerSelectSetup({
  minPlayers,
  maxPlayers,
  onStart,
}: PlayerSelectSetupProps) {
  const t = useTranslations("gameShell.setup");
  const { players, isLoading } = usePlayerRoster();
  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSelectedNames(players);
    }
  }, [isLoading, players]);

  const selectedCount = selectedNames.length;
  const isTooFew = selectedCount < minPlayers;
  const isTooMany = selectedCount > maxPlayers;
  const canStart = selectedCount >= minPlayers && selectedCount <= maxPlayers;

  const validationMessage = useMemo(() => {
    if (players.length === 0) {
      return t("emptyRoster");
    }
    if (isTooFew) {
      return t("tooFew", { min: minPlayers, count: selectedCount });
    }
    if (isTooMany) {
      return t("tooMany", { max: maxPlayers, count: selectedCount });
    }
    return null;
  }, [
    isTooFew,
    isTooMany,
    minPlayers,
    maxPlayers,
    players.length,
    selectedCount,
    t,
  ]);

  function togglePlayer(name: string) {
    setSelectedNames((current) =>
      current.includes(name)
        ? current.filter((playerName) => playerName !== name)
        : [...current, name],
    );
    setShowValidation(false);
  }

  function handleStart() {
    if (!canStart) {
      setShowValidation(true);
      return;
    }

    onStart({ playerNames: selectedNames });
  }

  if (isLoading) {
    return <p className="text-muted-foreground">{t("loading")}</p>;
  }

  if (players.length === 0) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-muted-foreground">{t("emptyRoster")}</p>
        <Button asChild>
          <Link href="/players">{t("goToPlayers")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">{t("title")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("subtitle", { min: minPlayers, max: maxPlayers })}
        </p>
      </div>

      <ul className="space-y-2">
        {players.map((name) => {
          const isSelected = selectedNames.includes(name);

          return (
            <li key={name}>
              <label
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "hover:bg-muted/50",
                )}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => togglePlayer(name)}
                  className="size-4 accent-[var(--primary)]"
                />
                <span className="font-medium">{name}</span>
              </label>
            </li>
          );
        })}
      </ul>

      {showValidation && validationMessage && (
        <p className="text-destructive text-sm" role="alert">
          {validationMessage}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={handleStart} disabled={!canStart}>
          {t("start")}
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/players">{t("managePlayers")}</Link>
        </Button>
      </div>
    </div>
  );
}
