import { getTranslations } from "next-intl/server";

import type { GameMeta } from "@/catalog/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export async function GameCard({ game }: { game: GameMeta }) {
  const t = await getTranslations();

  return (
    <Card
      aria-disabled="true"
      className={cn(
        "opacity-90",
        game.status === "coming-soon" && "cursor-default",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle>{t(game.nameKey)}</CardTitle>
          {game.status === "coming-soon" && (
            <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
              {t("games.comingSoon")}
            </span>
          )}
        </div>
        <CardDescription>{t(game.descriptionKey)}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm">
          {t("games.players", {
            min: game.minPlayers,
            max: game.maxPlayers,
          })}
        </p>
        <ul className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <li
              key={tag}
              className="bg-secondary text-secondary-foreground rounded-full px-2 py-0.5 text-xs"
            >
              {t(`tags.${tag}`)}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
