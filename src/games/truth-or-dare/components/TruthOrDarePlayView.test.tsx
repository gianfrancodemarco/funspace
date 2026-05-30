import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import type { GameSession } from "@/core/game-shell";
import { TruthOrDarePlayView } from "@/games/truth-or-dare/components/TruthOrDarePlayView";
import { TRUTH_OR_DARE_STATE_KEY } from "@/games/truth-or-dare/types";
import messages from "@/messages/en.json";

const send = vi.fn();

vi.mock("@/core/game-shell", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/core/game-shell")>();
  return {
    ...actual,
    useGameShell: () => ({ send }),
  };
});

const bothModeSession: GameSession = {
  gameId: "truth-or-dare",
  players: [
    { id: "p1", name: "Alex" },
    { id: "p2", name: "Blake" },
    { id: "p3", name: "Casey" },
  ],
  shuffledOrder: ["p1", "p2", "p3"],
  secrets: {
    [TRUTH_OR_DARE_STATE_KEY]: {
      config: {
        promptPackIds: ["classic"],
        promptMode: "both",
        locale: "en",
      },
      truthDeck: ["What is your biggest fear?", "What is your guilty pleasure?"],
      dareDeck: ["Do a dance for 10 seconds."],
      truthIndex: 0,
      dareIndex: 0,
      truthsPlayed: 0,
      daresPlayed: 0,
      turnOrder: ["p1", "p2", "p3"],
      currentTurnIndex: 0,
      skipCountsByPlayerId: { p1: 0, p2: 0, p3: 0 },
      status: "playing",
      turnPhase: "choosing",
    },
  },
};

const randomModeSession: GameSession = {
  ...bothModeSession,
  secrets: {
    [TRUTH_OR_DARE_STATE_KEY]: {
      ...(bothModeSession.secrets[TRUTH_OR_DARE_STATE_KEY] as object),
      config: {
        promptPackIds: ["classic"],
        promptMode: "random",
        locale: "en",
      },
      turnPhase: "showing",
      currentType: "truth",
    },
  },
};

describe("TruthOrDarePlayView", () => {
  it("shows Truth and Dare choice in both mode", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDarePlayView session={bothModeSession} onComplete={vi.fn()} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("Alex's turn")).toBeInTheDocument();
    expect(screen.getByText("Truth or Dare?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Truth" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Dare" })).toBeInTheDocument();
  });

  it("shows the prompt after choosing truth and advances on next", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDarePlayView session={bothModeSession} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Truth" }));
    expect(screen.getByText("What is your biggest fear?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Next prompt" }));
    expect(send).toHaveBeenCalled();
    expect(screen.getByText("Blake's turn")).toBeInTheDocument();
    expect(screen.getByText("Truth or Dare?")).toBeInTheDocument();
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("tracks skip for the active player and advances turn", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDarePlayView session={bothModeSession} onComplete={vi.fn()} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Truth" }));
    fireEvent.click(screen.getByRole("button", { name: "Skip" }));

    const patchCalls = send.mock.calls.filter(
      ([event]) => event.type === "PATCH_SECRETS",
    );
    const nextState =
      patchCalls[patchCalls.length - 1]?.[0].secrets[TRUTH_OR_DARE_STATE_KEY];
    expect(nextState.skipCountsByPlayerId.p1).toBe(1);
    expect(screen.getByText("Blake's turn")).toBeInTheDocument();
  });

  it("shows a prompt directly in random mode", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDarePlayView session={randomModeSession} onComplete={vi.fn()} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText("What is your biggest fear?")).toBeInTheDocument();
    expect(screen.getByText("Truth")).toBeInTheDocument();
    expect(screen.getByText("Alex's turn")).toBeInTheDocument();
  });

  it("completes the session when ending early", () => {
    const onComplete = vi.fn();
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <TruthOrDarePlayView session={bothModeSession} onComplete={onComplete} />
      </NextIntlClientProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "End session" }));
    expect(onComplete).toHaveBeenCalled();
  });
});
