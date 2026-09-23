import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutStory } from "@/components/sections/about/AboutStory";
import { AboutMission } from "@/components/sections/about/AboutMission";
import { IconFeatureGrid, type IconFeatureItem } from "@/components/sections/shared/IconFeatureGrid";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { SpreadTheWord } from "@/components/sections/shared/SpreadTheWord";
import { getAboutPageContent } from "@/lib/page-content";
import { resolveIcon } from "@/lib/icon-registry";
import { buildMetadata, getSeoSettings } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("about");
  return buildMetadata(seo, {
    title: "About Us",
    description:
      "At Arbree Solutions, we blend innovation, design, and technology to craft digital products that matter.",
    path: "/about",
  });
}

const DEFAULT_KEY_FEATURES = [
  { title: "Security", description: "Enterprise-grade encryption", iconKey: "shield-check" },
  { title: "Analytics", description: "Real-time insights", iconKey: "bar-chart-3" },
  { title: "Global", description: "Multi-region deployment", iconKey: "globe" },
  { title: "24/7 Support", description: "Dedicated team", iconKey: "headset" },
  { title: "Scalability", description: "250K+ daily transactions", iconKey: "users" },
  { title: "Growth", description: "Built for expansion", iconKey: "trending-up" },
];

const DEFAULT_COMMITMENT_VALUES = [
  {
    title: "Ethics",
    description:
      "Ethics for Arbree Solutions means ensuring our customers the confidentiality and uniqueness of the service they are provided. A client must be reassured that the service provided to them is made-to-measure and will not be recycled for their competitors.",
    iconKey: "shield-check",
  },
  {
    title: "Quality",
    description:
      "Arbree Solutions is committed to ensuring that our advice and recommendations are based on the best combination of methods, information research, creativity and internal quality assurance.",
    iconKey: "award",
  },
  {
    title: "Continuity",
    description:
      "Arbree Solutions considers that the continuity of relations on the long term with its clients is the guarantee of the satisfaction of these and the quality of the services provided.",
    iconKey: "heart-handshake",
  },
];

function toIconFeatureItems(
  items: { title: string; description: string; iconKey?: string }[],
): IconFeatureItem[] {
  return items.map((item) => ({
    title: item.title,
    description: item.description,
    icon: resolveIcon(item.iconKey),
  }));
}

export default async function AboutPage() {
  const content = await getAboutPageContent();

  const keyFeatures = toIconFeatureItems(content?.keyFeatures?.items ?? DEFAULT_KEY_FEATURES);
  const commitmentValues = toIconFeatureItems(
    content?.commitment?.items ?? DEFAULT_COMMITMENT_VALUES,
  );

  return (
    <>
      <Header activePath="/about" />
      <main className="flex-1">
        <AboutHero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
        <AboutStory paragraphs={content?.story?.paragraphs} stats={content?.story?.stats} />
        <AboutMission intro={content?.mission?.intro} rows={content?.mission?.rows} />
        <IconFeatureGrid
          background="muted"
          eyebrowLead="Key"
          eyebrowHighlight="Features"
          intro={
            content?.keyFeatures?.intro ??
            "Enterprise-grade features designed for scale, security, and reliability"
          }
          items={keyFeatures}
        />
        <IconFeatureGrid
          eyebrowLead="Our"
          eyebrowHighlight="Commitment"
          intro={
            content?.commitment?.intro ??
            "Building lasting partnerships through trust, quality, and unwavering dedication to your success"
          }
          items={commitmentValues}
        />
        <CtaBanner title={content?.cta?.title} description={content?.cta?.description} />
        {/* <SpreadTheWord /> */}
      </main>
      <Footer />
    </>
  );
}
