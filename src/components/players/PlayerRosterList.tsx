"use client";

import { PlayerRosterEmpty } from "@/components/players/PlayerRosterEmpty";
import { PlayerRosterListItem } from "@/components/players/PlayerRosterListItem";

type PlayerRosterListProps = {
  players: string[];
  onRemove: (index: number) => void;
  onRename: (index: number, newName: string) => void;
};

export function PlayerRosterList({
  players,
  onRemove,
  onRename,
}: PlayerRosterListProps) {
  if (players.length === 0) {
    return <PlayerRosterEmpty />;
  }

  return (
    <ul className="space-y-2">
      {players.map((name, index) => (
        <PlayerRosterListItem
          key={`${name}-${index}`}
          name={name}
          onRemove={() => onRemove(index)}
          onRename={(newName) => onRename(index, newName)}
        />
      ))}
    </ul>
  );
}
