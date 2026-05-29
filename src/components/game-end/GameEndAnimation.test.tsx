import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";

import { GameEndAnimation } from "@/components/game-end/GameEndAnimation";

function mockMatchMedia(matches: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("GameEndAnimation", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children with win variant", () => {
    render(
      <GameEndAnimation variant="win">
        <p>Victory!</p>
      </GameEndAnimation>,
    );

    expect(screen.getByText("Victory!")).toBeInTheDocument();
    expect(screen.getByText("Victory!").closest("[data-end-variant]")).toHaveAttribute(
      "data-end-variant",
      "win",
    );
  });

  it("renders children with loss variant", () => {
    render(
      <GameEndAnimation variant="loss">
        <p>Defeat</p>
      </GameEndAnimation>,
    );

    expect(screen.getByText("Defeat").closest("[data-end-variant]")).toHaveAttribute(
      "data-end-variant",
      "loss",
    );
  });

  it("shows confetti only for win when motion is allowed", () => {
    const { container, rerender } = render(
      <GameEndAnimation variant="win">
        <p>Win</p>
      </GameEndAnimation>,
    );

    expect(container.querySelectorAll(".game-end-confetti")).toHaveLength(10);

    rerender(
      <GameEndAnimation variant="loss">
        <p>Loss</p>
      </GameEndAnimation>,
    );

    expect(container.querySelectorAll(".game-end-confetti")).toHaveLength(0);
  });

  it("skips confetti and animation classes when reduced motion is preferred", () => {
    mockMatchMedia(true);

    const { container } = render(
      <GameEndAnimation variant="win">
        <p>Win</p>
      </GameEndAnimation>,
    );

    expect(
      screen.getByText("Win").closest("[data-reduced-motion]"),
    ).toHaveAttribute("data-reduced-motion", "true");
    expect(container.querySelectorAll(".game-end-confetti")).toHaveLength(0);
    expect(container.querySelector(".game-end-animate-win")).toBeNull();
  });
});
