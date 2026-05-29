import type { MetadataRoute } from "next";

import { getAllRegisteredGameIds } from "@/games/registry";
import { siteUrl } from "@/lib/utils";
import { routing } from "@/i18n/routing";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/players"];
  const gameRoutes = getAllRegisteredGameIds().map((gameId) => `/games/${gameId}`);

  return routing.locales.flatMap((locale) =>
    [...routes, ...gameRoutes].map((route) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: new Date(),
    })),
  );
}
