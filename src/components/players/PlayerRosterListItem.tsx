"use client";

import { PencilIcon, Trash2Icon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type PlayerRosterListItemProps = {
  name: string;
  onRemove: () => void;
  onRename: (newName: string) => void;
};

export function PlayerRosterListItem({
  name,
  onRemove,
  onRename,
}: PlayerRosterListItemProps) {
  const t = useTranslations("players");
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  function saveRename() {
    const trimmed = draft.trim();
    if (trimmed) {
      onRename(trimmed);
    }
    setIsEditing(false);
  }

  function cancelRename() {
    setDraft(name);
    setIsEditing(false);
  }

  return (
    <li className="flex items-center gap-2 rounded-xl border border-primary/10 bg-card px-3 py-2 shadow-xs">
      {isEditing ? (
        <>
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label={t("rename", { name })}
            className="flex-1"
          />
          <Button type="button" size="sm" onClick={saveRename}>
            {t("saveRename")}
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={cancelRename}>
            {t("cancelRename")}
          </Button>
        </>
      ) : (
        <>
          <span className="flex-1 text-sm font-medium">{name}</span>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={t("rename", { name })}
            onClick={() => {
              setDraft(name);
              setIsEditing(true);
            }}
          >
            <PencilIcon className="size-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label={t("remove", { name })}
            onClick={onRemove}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </>
      )}
    </li>
  );
}
