import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isGithubPages = process.env.GITHUB_PAGES === "true";
// Custom domain (funspace.gianfrancodemarco.dev) is served from site root, not /funspace.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGithubPages
    ? {
        output: "export",
        ...(basePath
          ? { basePath, assetPrefix: `${basePath}/` }
          : {}),
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
