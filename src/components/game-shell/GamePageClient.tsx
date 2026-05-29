"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { GameShellLayout } from "@/components/game-shell/GameShellLayout";
import { PlayerSelectSetup } from "@/components/game-shell/PlayerSelectSetup";
import { GameRulesTrigger } from "@/components/game-rules";
import { singleDeviceProvider } from "@/core/secret-delivery";
import {
  GameShellProvider,
  getPlayerName,
  useGameShell,
} from "@/core/game-shell";
import type { GameDefinition, GameRegistryEntry } from "@/core/game-shell";
import { renderImpostorRevealSecret } from "@/games/impostor";
import { renderQuestionImpostorRevealSecret } from "@/games/question-impostor";
import { getGameById } from "@/games/registry";

type GamePageClientProps = {
  gameId: string;
};

function ComingSoonGame({ entry }: { entry: Extract<GameRegistryEntry, { kind: "coming-soon" }> }) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <GameShellLayout title={t(entry.nameKey)}>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <span className="bg-accent/15 text-accent rounded-full px-3 py-1 text-sm font-semibold">
          {t("games.comingSoon")}
        </span>
        <p className="text-muted-foreground max-w-sm">
          {t("gameShell.comingSoonMessage")}
        </p>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-primary text-sm font-medium underline-offset-4 hover:underline"
        >
          {t("gameShell.backToHome")}
        </button>
      </div>
    </GameShellLayout>
  );
}

function PlayableGameShell() {
  const t = useTranslations();
  const router = useRouter();
  const { game, session, isSetup, isReveal, isPlay, isResolve, phase, send } =
    useGameShell();
  const RevealLoop = singleDeviceProvider.RevealLoop;
  const SetupView = game.SetupView ?? PlayerSelectSetup;
  const rulesMeta =
    game.rulesKeyPrefix && game.rulesRoleKeys && game.rulesStepCount
      ? {
          rulesKeyPrefix: game.rulesKeyPrefix,
          rulesRoleKeys: game.rulesRoleKeys,
          rulesStepCount: game.rulesStepCount,
        }
      : null;

  return (
    <GameShellLayout title={t(game.nameKey)} phase={phase}>
      {isSetup && (
        <div className="flex flex-1 flex-col gap-6">
          {rulesMeta && <GameRulesTrigger {...rulesMeta} />}
          <SetupView
            minPlayers={game.minPlayers}
            maxPlayers={game.maxPlayers}
            onStart={(input) =>
              send({
                type: "START",
                playerNames: input.playerNames,
                gameConfig: input.gameConfig,
              })
            }
          />
        </div>
      )}

      {isReveal && session && (
        <RevealLoop
          session={session}
          renderSecret={(playerId) => {
            if (game.id === "impostor") {
              return renderImpostorRevealSecret(session, playerId, t);
            }
            if (game.id === "question-impostor") {
              return renderQuestionImpostorRevealSecret(session, playerId, t);
            }

            const secret = session.secrets[playerId] as { number?: number } | undefined;
            if (game.id === "shell-demo" && secret?.number !== undefined) {
              return (
                <p className="text-2xl font-bold">
                  {t("gameShell.shellDemo.secret", { number: secret.number })}
                </p>
              );
            }

            return (
              <p className="text-lg">
                {t("gameShell.reveal.defaultSecret", {
                  name: getPlayerName(session, playerId),
                })}
              </p>
            );
          }}
          onComplete={() => send({ type: "REVEAL_DONE" })}
        />
      )}

      {isPlay && session && (
        <game.PlayView
          session={session}
          onComplete={() => send({ type: "PLAY_DONE" })}
        />
      )}

      {isResolve && session && (
        <game.ResolveView
          session={session}
          onRematch={() => send({ type: "REMATCH" })}
          onExit={() => {
            send({ type: "BACK_TO_SETUP" });
            router.push("/");
          }}
        />
      )}
    </GameShellLayout>
  );
}

export function GamePageClient({ gameId }: GamePageClientProps) {
  const entry = getGameById(gameId);

  if (!entry) {
    return null;
  }

  if (entry.kind === "coming-soon") {
    return <ComingSoonGame entry={entry} />;
  }

  return (
    <GameShellProvider game={entry.definition as GameDefinition}>
      <PlayableGameShell />
    </GameShellProvider>
  );
}
