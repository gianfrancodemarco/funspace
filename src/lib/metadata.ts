import type { Metadata } from "next";

import { siteUrl } from "@/lib/utils";

const openGraphLocales: Record<string, string> = {
  en: "en_US",
  it: "it_IT",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  locale,
}: PageMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "FunSpace",
      type: "website",
      locale: openGraphLocales[locale] ?? locale,
    },
  };
}
