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

import { validateTruthOrDareConfig } from "../config.schema";
import {
  getPresetConfig,
  truthOrDarePresets,
  type TruthOrDarePresetId,
} from "../presets";
import { getDefaultPromptPackIds, getPromptDecksForLocale } from "../prompt-decks";
import type { PromptMode, TruthOrDareConfig } from "../types";

const presetOptions: Array<{
  id: TruthOrDarePresetId;
  labelKey: "classic" | "sillyNight" | "daresOnly" | "allAges" | "custom";
}> = [
  ...truthOrDarePresets.map((preset) => ({
    id: preset.id,
    labelKey: preset.id as "classic" | "sillyNight" | "daresOnly" | "allAges",
  })),
  { id: "custom", labelKey: "custom" },
];

const promptModeOptions: PromptMode[] = [
  "both",
  "truth_only",
  "dare_only",
  "random",
];

export function TruthOrDareSetupView({
  minPlayers,
  maxPlayers,
  onStart,
}: GameSetupProps) {
  const t = useTranslations("truthOrDare.setup");
  const locale = useLocale();
  const { players, isLoading } = usePlayerRoster();
  const promptDecks = getPromptDecksForLocale(locale);

  const [selectedNames, setSelectedNames] = useState<string[]>([]);
  const [presetId, setPresetId] = useState<TruthOrDarePresetId>("classic");
  const [selectedPackIds, setSelectedPackIds] = useState<string[]>([]);
  const [promptMode, setPromptMode] = useState<PromptMode>("both");
  const [showPlayerPicker, setShowPlayerPicker] = useState(false);
  const [spicyConfirmed, setSpicyConfirmed] = useState(false);
  const [pendingSpicy, setPendingSpicy] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSelectedNames(players);
    }
  }, [isLoading, players]);

  useEffect(() => {
    setSelectedPackIds(getDefaultPromptPackIds(locale));
    setPromptMode("both");
    setShowPlayerPicker(false);
    setSpicyConfirmed(false);
    setPendingSpicy(false);
  }, [locale]);

  useEffect(() => {
    const presetConfig = getPresetConfig(presetId);
    if (presetConfig) {
      setSelectedPackIds(presetConfig.promptPackIds);
      setPromptMode(presetConfig.promptMode);
      setShowPlayerPicker(presetConfig.showPlayerPicker);
      setSpicyConfirmed(false);
      setPendingSpicy(false);
    }
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
    return validateTruthOrDareConfig(
      {
        promptPackIds: selectedPackIds,
        promptMode,
        showPlayerPicker,
        locale,
      },
      selectedCount,
      minPlayers,
      maxPlayers,
    );
  }, [
    locale,
    maxPlayers,
    minPlayers,
    players.length,
    promptMode,
    selectedCount,
    selectedPackIds,
    showPlayerPicker,
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

  function togglePack(packId: string, isAdult: boolean) {
    if (isAdult && !selectedPackIds.includes(packId)) {
      if (!spicyConfirmed) {
        setPendingSpicy(true);
        return;
      }
    }

    setSelectedPackIds((current) => {
      if (current.includes(packId)) {
        if (isAdult) {
          setSpicyConfirmed(false);
        }
        return current.filter((id) => id !== packId);
      }
      return [...current, packId];
    });
    setPresetId("custom");
    setShowValidation(false);
    setPendingSpicy(false);
  }

  function confirmSpicyPack() {
    setSpicyConfirmed(true);
    setSelectedPackIds((current) =>
      current.includes("spicy") ? current : [...current, "spicy"],
    );
    setPresetId("custom");
    setPendingSpicy(false);
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
        promptPackIds: selectedPackIds,
        promptMode,
        showPlayerPicker,
        locale,
      } satisfies TruthOrDareConfig,
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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("modesTitle")}</h2>
          <div className="grid grid-cols-2 gap-2">
            {promptModeOptions.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setPromptMode(mode);
                  setPresetId("custom");
                }}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                  promptMode === mode
                    ? "border-primary bg-primary/10 text-primary"
                    : "hover:bg-muted/50",
                )}
              >
                {t(`modes.${mode}`)}
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3">
            <input
              type="checkbox"
              checked={showPlayerPicker}
              onChange={() => {
                setShowPlayerPicker((current) => !current);
                setPresetId("custom");
              }}
              className="size-4 accent-[var(--primary)]"
            />
            <span className="font-medium">{t("playerPickerToggle")}</span>
          </label>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">{t("packsTitle")}</h2>
          <ul className="space-y-2">
            {promptDecks.map((deck) => (
              <li key={deck.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedPackIds.includes(deck.id)}
                    onChange={() => togglePack(deck.id, deck.isAdult)}
                    className="size-4 accent-[var(--primary)]"
                  />
                  <span className="font-medium">
                    {t(`packs.${deck.id}`)}
                    {deck.isAdult ? ` (${t("adultBadge")})` : ""}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          {pendingSpicy && (
            <div className="space-y-3 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4">
              <p className="text-sm">{t("spicyConfirm.message")}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={confirmSpicyPack}>
                  {t("spicyConfirm.confirm")}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPendingSpicy(false)}
                >
                  {t("spicyConfirm.cancel")}
                </Button>
              </div>
            </div>
          )}
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
