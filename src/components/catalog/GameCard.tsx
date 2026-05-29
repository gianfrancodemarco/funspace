import { getTranslations } from "next-intl/server";

import type { GameMeta } from "@/catalog/types";
import { TagBadge } from "@/components/catalog/TagBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGameAccentBorderClass } from "@/lib/game-accents";
import { cn } from "@/lib/utils";

export async function GameCard({ game }: { game: GameMeta }) {
  const t = await getTranslations();

  return (
    <Card
      aria-disabled="true"
      className={cn(
        "border-t-4 shadow-sm transition-shadow hover:shadow-md",
        getGameAccentBorderClass(game.accentColor),
        game.status === "coming-soon" && "cursor-default",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{t(game.nameKey)}</CardTitle>
          {game.status === "coming-soon" && (
            <span className="bg-accent/15 text-accent shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold">
              {t("games.comingSoon")}
            </span>
          )}
        </div>
        <CardDescription className="text-base leading-relaxed">
          {t(game.descriptionKey)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm font-medium">
          {t("games.players", {
            min: game.minPlayers,
            max: game.maxPlayers,
          })}
        </p>
        <ul className="flex flex-wrap gap-2">
          {game.tags.map((tag) => (
            <li key={tag}>
              <TagBadge tag={tag} label={t(`tags.${tag}`)} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
