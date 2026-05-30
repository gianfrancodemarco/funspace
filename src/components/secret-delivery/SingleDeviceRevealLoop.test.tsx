import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { SingleDeviceRevealLoop } from "@/components/secret-delivery/SingleDeviceRevealLoop";
import type { GameSession } from "@/core/game-shell";
import messages from "@/messages/en.json";

const session: GameSession = {
  gameId: "shell-demo",
  players: [
    { id: "player-1", name: "Marco" },
    { id: "player-2", name: "Giulia" },
  ],
  shuffledOrder: ["player-1", "player-2"],
  secrets: {
    "player-1": { number: 42 },
    "player-2": { number: 42 },
  },
};

function renderLoop(onComplete = vi.fn()) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <SingleDeviceRevealLoop
        session={session}
        renderSecret={(playerId) => (
          <p>Secret for {playerId === "player-1" ? "Marco" : "Giulia"}</p>
        )}
        onComplete={onComplete}
      />
    </NextIntlClientProvider>,
  );
}

describe("SingleDeviceRevealLoop", () => {
  it("reveals and confirms each player on the same screen", () => {
    const onComplete = vi.fn();
    renderLoop(onComplete);

    expect(screen.getByText("Marco")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reveal" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText("Secret for Marco")).toBeVisible();
    expect(screen.getByRole("button", { name: "Got it" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Got it" }));
    expect(screen.getByText("Giulia")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reveal" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(screen.getByText("Secret for Giulia")).toBeVisible();

    fireEvent.click(screen.getByRole("button", { name: "Finish reveal" }));

    expect(onComplete).toHaveBeenCalledOnce();
  });
});
