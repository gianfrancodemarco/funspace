"use client";

import { useTranslations } from "next-intl";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PlayerRosterAddFormProps = {
  onAdd: (name: string) => void;
};

export function PlayerRosterAddForm({ onAdd }: PlayerRosterAddFormProps) {
  const t = useTranslations("players");
  const [name, setName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    onAdd(trimmed);
    setName("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1 space-y-2">
        <label htmlFor="player-name" className="text-sm font-medium">
          {t("addLabel")}
        </label>
        <Input
          id="player-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder={t("addPlaceholder")}
          autoComplete="off"
        />
      </div>
      <Button type="submit" className="sm:mb-0">
        {t("addButton")}
      </Button>
    </form>
  );
}
