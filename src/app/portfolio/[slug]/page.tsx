import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyHero } from "@/components/sections/portfolio-details/CaseStudyHero";
import { CaseStudyOverview } from "@/components/sections/portfolio-details/CaseStudyOverview";
import { IconFeatureGrid } from "@/components/sections/shared/IconFeatureGrid";
import { TechStackHighlights } from "@/components/sections/portfolio-details/TechStackHighlights";
import { CaseStudySolutionProcess } from "@/components/sections/portfolio-details/CaseStudySolutionProcess";
import { ProjectGallery } from "@/components/sections/portfolio-details/ProjectGallery";
import { RelatedCaseStudies } from "@/components/sections/portfolio-details/RelatedCaseStudies";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { CASE_STUDIES } from "@/lib/case-studies";
import { FALLBACK_PORTFOLIO_GRID, type PortfolioGridItem } from "@/components/sections/portfolio/PortfolioGrid";
import { resolveCaseStudyDetail } from "@/lib/case-study-detail";
import { prisma } from "@/lib/prisma";
import { buildMetadata } from "@/lib/seo";

async function getPortfolioItemBySlug(slug: string) {
  try {
    return await prisma.portfolioItem.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbItem = await getPortfolioItemBySlug(slug);
  const staticCaseStudy = CASE_STUDIES[slug];
  const staticListing = FALLBACK_PORTFOLIO_GRID.find((item) => item.slug === slug);

  const fallbackTitle = dbItem?.title ?? staticCaseStudy?.title ?? staticListing?.title ?? "Portfolio";
  const fallbackDescription =
    dbItem?.summary ?? staticCaseStudy?.subtitle ?? staticListing?.summary ?? "";
  const fallbackImage = dbItem?.coverImage || staticCaseStudy?.heroImage || staticListing?.coverImage;

  return buildMetadata(dbItem, {
    title: fallbackTitle,
    description: fallbackDescription,
    image: fallbackImage ?? undefined,
    path: `/portfolio/${slug}`,
  });
}

async function getRelatedItems(excludeSlug: string): Promise<PortfolioGridItem[]> {
  try {
    const items = await prisma.portfolioItem.findMany({
      where: { slug: { not: excludeSlug } },
      orderBy: { order: "asc" },
      take: 3,
    });
    if (items.length > 0) {
      return items.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        countryCode: item.countryCode,
        summary: item.summary,
        coverImage: item.coverImage || null,
        tags: item.tags,
      }));
    }
  } catch {
    // fall through to static fallback below
  }
  return FALLBACK_PORTFOLIO_GRID.filter((item) => item.slug !== excludeSlug).slice(0, 3);
}

export default async function PortfolioDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const dbItem = await getPortfolioItemBySlug(slug);
  const staticCaseStudy = CASE_STUDIES[slug];
  const staticListing = FALLBACK_PORTFOLIO_GRID.find((item) => item.slug === slug);

  if (!dbItem && !staticCaseStudy && !staticListing) {
    notFound();
  }

  const related = await getRelatedItems(slug);

  // Prefer live DB content; fall back to the bundled example, then to a
  // hero-only view built from whichever listing data is available.
  const dbDetail = dbItem ? resolveCaseStudyDetail(dbItem.caseStudyDetail) : null;

  const hero = dbItem
    ? {
        title: dbItem.title,
        subtitle: dbItem.summary,
        meta: {
          client: dbItem.client ?? "—",
          duration: dbItem.duration ?? "—",
          teamSize: dbItem.teamSize ?? "—",
        },
        tags: dbItem.tags,
        image: dbItem.coverImage || staticCaseStudy?.heroImage || "",
      }
    : staticCaseStudy
      ? {
          title: staticCaseStudy.title,
          subtitle: staticCaseStudy.subtitle,
          meta: staticCaseStudy.meta,
          tags: staticCaseStudy.tags,
          image: staticCaseStudy.heroImage,
        }
      : staticListing
        ? {
            title: staticListing.title,
            subtitle: staticListing.summary,
            meta: { client: "—", duration: "—", teamSize: "—" },
            tags: staticListing.tags,
            image: staticListing.coverImage ?? "",
          }
        : null;

  // Rich detail sections: prefer the DB's caseStudyDetail JSON, then the
  // bundled static example (only relevant when there's no dbItem override).
  const richDetail =
    dbDetail ??
    (!dbItem && staticCaseStudy
      ? {
          stats: staticCaseStudy.stats,
          keyFeatures: staticCaseStudy.keyFeatures,
          techStackIntro: staticCaseStudy.techStackIntro,
          techHighlights: staticCaseStudy.techHighlights,
          solutionSummary: staticCaseStudy.solutionSummary,
          process: staticCaseStudy.process,
          gallery: staticCaseStudy.gallery,
        }
      : null);

  const overview = dbItem?.overview || staticCaseStudy?.overview || "";

  return (
    <>
      <Header activePath="/portfolio" />
      <main className="flex-1">
        {hero && (
          <CaseStudyHero
            title={hero.title}
            subtitle={hero.subtitle}
            meta={hero.meta}
            tags={hero.tags}
            image={hero.image}
          />
        )}

        {richDetail && (
          <>
            <CaseStudyOverview overview={overview} stats={richDetail.stats} />
            <IconFeatureGrid
              background="muted"
              eyebrowLead="Key"
              eyebrowHighlight="Features"
              intro="Enterprise-grade features designed for scale, security, and reliability"
              items={richDetail.keyFeatures}
            />
            <TechStackHighlights
              title="Technology Stack"
              description={richDetail.techStackIntro}
              highlights={richDetail.techHighlights}
            />
            {/* {richDetail.gallery.length > 0 && <ProjectGallery images={richDetail.gallery} />} */}
            <CaseStudySolutionProcess
              solutionSummary={richDetail.solutionSummary}
              steps={richDetail.process}
            />
          </>
        )}

        <RelatedCaseStudies items={related} />

        <CtaBanner
          title="Interested in Similar Project?"
          description="Let's discuss how we can help you build a custom solution for your business needs"
          ctaLabel="View More Projects"
          ctaHref="/portfolio"
          secondaryCtaLabel="Start Your Project"
          secondaryCtaHref="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
