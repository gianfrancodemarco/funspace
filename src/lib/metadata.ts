import type { Metadata } from "next";

import { siteUrl } from "@/lib/utils";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
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
      locale: "en",
    },
  };
}
