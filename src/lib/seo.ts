import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

const SITE_NAME = "Arbree Solutions";
const SITE_URL = "https://arbreesolutions.com"; // update once a real domain is wired up

export type SeoOverrides = {
  heading?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
  featuredImage?: string | null;
};

export type SeoDefaults = {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  path?: string; // e.g. "/about" — used to build the canonical/OG url
};

/** Merges DB overrides (if any) over hardcoded per-page defaults into a
 * Next.js `Metadata` object. Every field gracefully falls back, so a page
 * with no SeoSettings/Blog/PortfolioItem SEO row still gets sensible,
 * complete metadata. */
export function buildMetadata(overrides: SeoOverrides | null | undefined, defaults: SeoDefaults): Metadata {
  const title = overrides?.metaTitle || defaults.title;
  const description = overrides?.metaDescription || defaults.description;
  const keywords = overrides?.metaKeywords || defaults.keywords;
  const image = overrides?.ogImage || overrides?.featuredImage || defaults.image;
  const ogTitle = overrides?.ogTitle || title;
  const ogDescription = overrides?.ogDescription || description;
  const twitterTitle = overrides?.twitterTitle || ogTitle;
  const twitterDescription = overrides?.twitterDescription || ogDescription;
  const twitterImage = overrides?.twitterImage || image;
  const url = defaults.path ? `${SITE_URL}${defaults.path}` : SITE_URL;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: keywords ? keywords.split(",").map((k) => k.trim()).filter(Boolean) : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: SITE_NAME,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
    twitter: {
      card: twitterImage ? "summary_large_image" : "summary",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
    alternates: { canonical: url },
  };
}

export async function getSeoSettings(page: string): Promise<SeoOverrides | null> {
  try {
    return await prisma.seoSettings.findUnique({ where: { page } });
  } catch {
    return null;
  }
}

export async function getSeoHeading(page: string): Promise<string | undefined> {
  const settings = await getSeoSettings(page);
  return settings?.heading ?? undefined;
}
