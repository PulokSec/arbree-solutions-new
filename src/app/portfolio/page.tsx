import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioFilterTabs } from "@/components/sections/portfolio/PortfolioFilterTabs";
import { PortfolioGrid } from "@/components/sections/portfolio/PortfolioGrid";
import { WhyTrustArbree } from "@/components/sections/portfolio/WhyTrustArbree";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { getPortfolioGridItems } from "@/lib/cms";
import { buildMetadata, getSeoSettings } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("portfolio");
  return buildMetadata(seo, {
    title: "Portfolio",
    description:
      "Explore our portfolio of enterprise platforms, web applications, mobile solutions, and successful technology partnerships.",
    path: "/portfolio",
  });
}

export default async function PortfolioPage() {
  const [items, seo] = await Promise.all([getPortfolioGridItems(), getSeoSettings("portfolio")]);

  return (
    <>
      <Header activePath="/portfolio" />
      <main className="flex-1">
        <PortfolioHero heading={seo?.heading ?? undefined} />
        <PortfolioFilterTabs />
        <PortfolioGrid items={items} />
        <WhyTrustArbree />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
