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

import { validateQuestionImpostorConfig } from "../config.schema";
import {
  getPresetConfig,
  questionImpostorPresets,
  type QuestionImpostorPresetId,
} from "../presets";
import type { QuestionImpostorConfig } from "../types";
import {
  getDefaultQuestionPackIds,
  getQuestionPacksForLocale,
} from "../question-packs";

const presetOptions: Array<{
  id: QuestionImpostorPresetId;
  labelKey: "classic" | "twoImpostors" | "chaos" | "custom";
}> = [
  ...questionImpostorPresets.map((preset) => ({
    id: preset.id,
    labelKey:
      preset.id === "two-impostors"
        ? ("twoImpostors" as const)
        : (preset.id as "classic" | "chaos"),
  })),
  { id: "custom", labelKey: "custom" },
];

export function QuestionImpostorSetupView({
  minPlayers,
  maxPlayers,
  onStart,
}: GameSetupProps) {
  const t = useTranslations("questionImpostor.setup");
  const locale = useLocale();
  const { players, isLoading } = usePlayerRoster();
  const questionPacks = getQuestionPacksForLocale(locale);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [presetId, setPresetId] = useState<QuestionImpostorPresetId>("classic");
  const [impostorCount, setImpostorCount] = useState(1);
  const [selectedPackIds, setSelectedPackIds] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSelectedNames(players);
    }
  }, [isLoading, players]);

  useEffect(() => {
    setSelectedPackIds(getDefaultQuestionPackIds(locale));
  }, [locale]);

  useEffect(() => {
    if (presetId === "custom") {
      return;
    }
    const preset = getPresetConfig(presetId);
    setImpostorCount(preset.impostorCount);
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
    if (selectedPackIds.length === 0) {
      return "noPacks";
    }
    return validateQuestionImpostorConfig(
      {
        impostorCount,
        questionPackIds: selectedPackIds,
        locale,
      },
      selectedCount,
    );
  }, [
    impostorCount,
    locale,
    maxPlayers,
    minPlayers,
    players.length,
    selectedCount,
    selectedPackIds,
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

  function togglePack(packId: string) {
    setSelectedPackIds((current) => {
      if (current.includes(packId)) {
        return current.filter((id) => id !== packId);
      }
      return [...current, packId];
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
        impostorCount,
        questionPackIds: selectedPackIds,
        locale,
      } satisfies QuestionImpostorConfig,
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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {presetOptions.map((preset) => {
              const labelKey = preset.labelKey;

              return (
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
                      {t(`presets.${labelKey}`)}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    {t(`presetTooltips.${labelKey}`)}
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </section>

        {presetId === "custom" && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">{t("impostorCount")}</span>
              <input
                type="number"
                min={1}
                max={Math.floor(selectedCount / 2) || 1}
                value={impostorCount}
                onChange={(event) =>
                  setImpostorCount(Number.parseInt(event.target.value, 10) || 1)
                }
                className="border-input bg-background w-full rounded-md border px-3 py-2"
              />
            </label>
          </section>
        )}

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("packsTitle")}</h2>
          <ul className="space-y-2">
            {questionPacks.map((pack) => (
              <li key={pack.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedPackIds.includes(pack.id)}
                    onChange={() => togglePack(pack.id)}
                    className="size-4 accent-[var(--primary)]"
                  />
                  <span className="font-medium">{t(`packs.${pack.id}`)}</span>
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
