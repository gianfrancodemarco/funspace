import { describe, expect, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

import { PlayerRosterPanel } from "@/components/players/PlayerRosterPanel";
import type { StoragePort } from "@/core/storage";
import messages from "@/messages/en.json";

function createMemoryStorage(): StoragePort {
  const store = new Map<string, unknown>();

  return {
    get<T>(key: string) {
      return (store.get(key) as T | undefined) ?? null;
    },
    set<T>(key: string, value: T) {
      store.set(key, value);
    },
    remove(key: string) {
      store.delete(key);
    },
  };
}

function renderPanel(storagePort = createMemoryStorage()) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <PlayerRosterPanel storagePort={storagePort} />
    </NextIntlClientProvider>,
  );
}

describe("PlayerRosterPanel", () => {
  let storagePort: StoragePort;

  beforeEach(() => {
    storagePort = createMemoryStorage();
  });

  it("shows empty state when no players are saved", async () => {
    renderPanel(storagePort);

    expect(await screen.findByText("No players yet")).toBeInTheDocument();
  });

  it("adds a player to the roster", async () => {
    renderPanel(storagePort);

    fireEvent.change(screen.getByLabelText("Player name"), {
      target: { value: "Marco" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add player" }));

    expect(await screen.findByText("Marco")).toBeInTheDocument();
    expect(screen.queryByText("No players yet")).not.toBeInTheDocument();
  });

  it("removes a player from the roster", async () => {
    renderPanel(storagePort);

    fireEvent.change(screen.getByLabelText("Player name"), {
      target: { value: "Marco" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add player" }));

    fireEvent.click(
      await screen.findByRole("button", { name: "Remove Marco" }),
    );

    expect(await screen.findByText("No players yet")).toBeInTheDocument();
  });

  it("renames a player in the roster", async () => {
    renderPanel(storagePort);

    fireEvent.change(screen.getByLabelText("Player name"), {
      target: { value: "Marco" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Add player" }));

    fireEvent.click(await screen.findByRole("button", { name: "Rename Marco" }));
    fireEvent.change(screen.getByLabelText("Rename Marco"), {
      target: { value: "Luca" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Save name" }));

    expect(await screen.findByText("Luca")).toBeInTheDocument();
    expect(screen.queryByText("Marco")).not.toBeInTheDocument();
  });
});
