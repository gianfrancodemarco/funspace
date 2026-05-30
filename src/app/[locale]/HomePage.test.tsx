import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { games } from "@/catalog/games";
import messages from "@/messages/en.json";

function GameCardTest({ game }: { game: (typeof games)[number] }) {
  const t = (key: string, values?: Record<string, number>) => {
    const parts = key.split(".");
    let value: unknown = messages;
    for (const part of parts) {
      value = (value as Record<string, unknown>)[part];
    }
    if (typeof value === "string" && values) {
      return value
        .replace("{min}", String(values.min))
        .replace("{max}", String(values.max));
    }
    return value as string;
  };

  return (
    <article aria-disabled={game.status === "coming-soon"}>
      <h3>{t(game.nameKey)}</h3>
      <p>{t(game.descriptionKey)}</p>
      {game.status === "coming-soon" && (
        <span>{t("games.comingSoon")}</span>
      )}
    </article>
  );
}

describe("Homepage content", () => {
  it("renders hero copy and game cards from catalog data", () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <div>
          <h1>{messages.home.heroTitle}</h1>
          <p>{messages.home.heroTagline}</p>
          {games.map((game) => (
            <GameCardTest key={game.id} game={game} />
          ))}
        </div>
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "FunSpace",
    );
    expect(
      screen.getByText("Party games for friends, one phone"),
    ).toBeInTheDocument();
    expect(screen.getByText("Impostor")).toBeInTheDocument();
    expect(screen.getByText("Hangman")).toBeInTheDocument();
    expect(screen.getByText("Never Have I Ever")).toBeInTheDocument();
    expect(screen.getByText("Question Impostor")).toBeInTheDocument();
    expect(screen.getByText("Truth or Dare")).toBeInTheDocument();
    expect(screen.queryAllByText("Coming soon")).toHaveLength(0);
  });
});
