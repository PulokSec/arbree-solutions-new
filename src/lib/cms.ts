import { prisma } from "@/lib/prisma";
import type { StatItemData } from "@/components/sections/home/HomeIntroStats";
import type { ServiceBlockData } from "@/components/sections/home/HomeServices";
import type { PortfolioCardData } from "@/components/sections/home/HomeOurWork";
import type { TestimonialData } from "@/components/sections/home/HomeTestimonial";
import type { ClientLogoItem } from "@/components/sections/home/TrustedByClients";
import type { PortfolioGridItem } from "@/components/sections/portfolio/PortfolioGrid";

/**
 * Every function here returns `undefined` when the database is unreachable
 * or the table is empty, so callers can fall back to each component's
 * built-in placeholder data with `data ?? undefined` (the component's own
 * default parameter takes over). This keeps the site fully usable before
 * `DATABASE_URL` is wired up, and means the admin dashboard's content
 * appears automatically the moment records exist — no code changes needed.
 */

export async function getHomeStats(): Promise<StatItemData[] | undefined> {
  try {
    const stats = await prisma.statItem.findMany({ orderBy: { order: "asc" }, take: 4 });
    if (stats.length === 0) return undefined;
    return stats.map((s) => ({ id: s.id, label: s.label, value: s.value }));
  } catch {
    return undefined;
  }
}

export async function getHomeServices(): Promise<ServiceBlockData[] | undefined> {
  try {
    const services = await prisma.service.findMany({
      where: { published: true },
      include: { tags: { orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
    });

    const techSolution = services.find((s) => s.category === "TECH_SOLUTION");
    const teamAugmentation = services.find((s) => s.category === "TEAM_AUGMENTATION");
    if (!techSolution && !teamAugmentation) return undefined;

    const mapService = (
      s: (typeof services)[number] | undefined,
      fallbackTitle: string,
    ): ServiceBlockData | undefined =>
      s
        ? {
            id: s.id,
            title: s.title || fallbackTitle,
            description: s.description,
            coverImage: s.coverImage ?? null,
            tags: s.tags.map((t: { id: string; label: string }) => ({ id: t.id, label: t.label })),
          }
        : undefined;

    const blocks = [
      mapService(techSolution, "Tech Solution"),
      mapService(teamAugmentation, "Team Augmentation"),
    ].filter((b): b is ServiceBlockData => Boolean(b));

    return blocks.length > 0 ? blocks : undefined;
  } catch {
    return undefined;
  }
}

export async function getHomePortfolioItems(): Promise<PortfolioCardData[] | undefined> {
  try {
    const items = await prisma.portfolioItem.findMany({
      orderBy: { order: "asc" },
      take: 3,
    });
    if (items.length === 0) return undefined;
    return items.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      countryCode: item.countryCode,
      summary: item.summary,
      coverImage: item.coverImage || null,
      tags: item.tags,
    }));
  } catch {
    return undefined;
  }
}

export async function getPortfolioGridItems(): Promise<PortfolioGridItem[] | undefined> {
  try {
    const items = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });
    if (items.length === 0) return undefined;
    return items.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      countryCode: item.countryCode,
      summary: item.summary,
      coverImage: item.coverImage || null,
      tags: item.tags,
    }));
  } catch {
    return undefined;
  }
}

export async function getTestimonials(): Promise<TestimonialData[] | undefined> {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (testimonials.length === 0) return undefined;
    return testimonials.map((t) => ({
      id: t.id,
      quote: t.quote,
      authorName: t.authorName,
      authorTitle: t.authorTitle,
      authorAvatar: t.authorAvatar,
      rating: t.rating,
    }));
  } catch {
    return undefined;
  }
}

export async function getClientLogos(): Promise<ClientLogoItem[] | undefined> {
  try {
    const logos = await prisma.clientLogo.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    if (logos.length === 0) return undefined;
    return logos.map((l) => ({ id: l.id, name: l.name, logo: l.logo, url: l.url }));
  } catch {
    return undefined;
  }
}
