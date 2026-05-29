import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { GamePageClient } from "@/components/game-shell/GamePageClient";
import { impostorDefinition } from "@/games/impostor";
import messages from "@/messages/en.json";

const mockUseGameShell = vi.fn();

vi.mock("@/games/impostor/components/ImpostorSetupView", () => ({
  ImpostorSetupView: () => <div>Setup form</div>,
}));

vi.mock("@/components/game-rules", () => ({
  GameRulesTrigger: () => (
    <button type="button">How to play</button>
  ),
}));

vi.mock("@/i18n/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  redirect: vi.fn(),
  getPathname: vi.fn(),
}));

vi.mock("@/core/player-roster", () => ({
  usePlayerRoster: () => ({
    players: ["Alex", "Blake", "Casey"],
    isLoading: false,
    addPlayer: vi.fn(),
    removePlayer: vi.fn(),
    renamePlayer: vi.fn(),
  }),
}));

vi.mock("@/games/registry", () => ({
  getGameById: () => ({
    kind: "playable",
    definition: impostorDefinition,
  }),
}));

vi.mock("@/core/game-shell", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/core/game-shell")>();
  return {
    ...actual,
    GameShellProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    useGameShell: () => mockUseGameShell(),
  };
});

describe("GamePageClient", () => {
  beforeEach(() => {
    mockUseGameShell.mockReturnValue({
      game: impostorDefinition,
      session: null,
      phase: "setup" as const,
      isSetup: true,
      isReveal: false,
      isPlay: false,
      isResolve: false,
      send: vi.fn(),
    });
  });

  it("registers impostor rules metadata on the game definition", () => {
    expect(impostorDefinition.rulesKeyPrefix).toBe("impostor.rules");
    expect(impostorDefinition.rulesRoleKeys).toEqual([
      "civilian",
      "impostor",
      "spy",
    ]);
    expect(impostorDefinition.rulesStepCount).toBe(5);
  });

  it("shows rules trigger on setup when shell is in setup phase", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <GamePageClient gameId="impostor" />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("button", { name: "How to play" }),
    ).toBeInTheDocument();
  });

  it("hides rules trigger outside setup phase", () => {
    mockUseGameShell.mockReturnValue({
      game: impostorDefinition,
      session: null,
      phase: "play",
      isSetup: false,
      isReveal: false,
      isPlay: true,
      isResolve: false,
      send: vi.fn(),
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <GamePageClient gameId="impostor" />
      </NextIntlClientProvider>,
    );

    expect(
      screen.queryByRole("button", { name: "How to play" }),
    ).not.toBeInTheDocument();
  });
});
