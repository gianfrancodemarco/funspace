"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GameSetupProps } from "@/core/game-shell";
import { usePlayerRoster } from "@/core/player-roster";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { validateHangmanConfig } from "../config.schema";
import {
  getPresetMaxWrongGuesses,
  hangmanPresets,
  type HangmanPresetId,
} from "../presets";
import type { HangmanConfig } from "../types";
import { getDefaultWordListIds, getWordListsForLocale } from "../word-lists";

const presetOptions: Array<{
  id: HangmanPresetId;
  labelKey: "classic" | "forgiving" | "custom";
}> = [
  ...hangmanPresets.map((preset) => ({
    id: preset.id,
    labelKey: preset.id as "classic" | "forgiving",
  })),
  { id: "custom", labelKey: "custom" },
];

export function HangmanSetupView({
  minPlayers,
  maxPlayers,
  onStart,
}: GameSetupProps) {
  const t = useTranslations("hangman.setup");
  const locale = useLocale();
  const { players, isLoading } = usePlayerRoster();
  const wordLists = getWordListsForLocale(locale);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [presetId, setPresetId] = useState<HangmanPresetId>("classic");
  const [maxWrongGuesses, setMaxWrongGuesses] = useState(6);
  const [selectedListIds, setSelectedListIds] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSelectedNames(players);
    }
  }, [isLoading, players]);

  useEffect(() => {
    setSelectedListIds(getDefaultWordListIds(locale));
  }, [locale]);

  useEffect(() => {
    if (presetId === "custom") {
      return;
    }
    setMaxWrongGuesses(getPresetMaxWrongGuesses(presetId));
  }, [presetId]);

  const selectedCount = selectedNames.length;

  const validationKey = useMemo(() => {
    if (players.length === 0) {
      return "emptyRoster";
    }
    if (selectedCount < minPlayers) {
      return "tooFew";
    }
    if (selectedCount > maxPlayers) {
      return "tooMany";
    }
    if (selectedListIds.length === 0) {
      return "noPacks";
    }
    return validateHangmanConfig(
      {
        wordPackIds: selectedListIds,
        maxWrongGuesses,
        locale,
      },
      selectedCount,
      minPlayers,
      maxPlayers,
    );
  }, [
    locale,
    maxPlayers,
    maxWrongGuesses,
    minPlayers,
    players.length,
    selectedCount,
    selectedListIds,
  ]);

  const canStart = validationKey === null;

  function togglePlayer(name: string) {
    setSelectedNames((current) =>
      current.includes(name)
        ? current.filter((playerName) => playerName !== name)
        : [...current, name],
    );
    setShowValidation(false);
  }

  function toggleList(listId: string) {
    setSelectedListIds((current) => {
      if (current.includes(listId)) {
        return current.filter((id) => id !== listId);
      }
      return [...current, listId];
    });
    setPresetId("custom");
    setShowValidation(false);
  }

  function handleStart() {
    if (!canStart) {
      setShowValidation(true);
      return;
    }

    onStart({
      playerNames: selectedNames,
      gameConfig: {
        wordPackIds: selectedListIds,
        maxWrongGuesses,
        locale,
      } satisfies HangmanConfig,
    });
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
    <TooltipProvider>
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("playersTitle")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("playersSubtitle", { min: minPlayers, max: maxPlayers })}
        </p>
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
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("presetsTitle")}</h2>
        <div className="grid grid-cols-3 gap-2">
          {presetOptions.map((preset) => (
            <Tooltip key={preset.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setPresetId(preset.id)}
                  className={cn(
                    "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                    presetId === preset.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "hover:bg-muted/50",
                  )}
                >
                  {t(`presets.${preset.labelKey}`)}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {t(`presetTooltips.${preset.labelKey}`)}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </section>

      {presetId === "custom" && (
        <section className="space-y-2">
          <label className="text-sm font-medium" htmlFor="max-wrong-guesses">
            {t("maxWrongGuesses")}
          </label>
          <input
            id="max-wrong-guesses"
            type="number"
            min={4}
            max={10}
            value={maxWrongGuesses}
            onChange={(event) =>
              setMaxWrongGuesses(Number.parseInt(event.target.value, 10) || 6)
            }
            className="border-input bg-background w-full rounded-md border px-3 py-2"
          />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("packsTitle")}</h2>
        <ul className="space-y-2">
          {wordLists.map((list) => (
            <li key={list.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedListIds.includes(list.id)}
                  onChange={() => toggleList(list.id)}
                  className="size-4 accent-[var(--primary)]"
                />
                <span className="font-medium">{t(`packs.${list.id}`)}</span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      {showValidation && validationKey && (
        <p className="text-destructive text-sm" role="alert">
          {t(`validation.${validationKey}`, {
            min: minPlayers,
            max: maxPlayers,
            count: selectedCount,
          })}
        </p>
      )}

      <Button size="lg" onClick={handleStart} disabled={!canStart}>
        {t("start")}
      </Button>
    </div>
    </TooltipProvider>
  );
}
