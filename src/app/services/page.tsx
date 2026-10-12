import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesOverview } from "@/components/sections/services/ServicesOverview";
import { ServiceDetailSection } from "@/components/sections/services/ServiceDetailSection";
import { TeamAugmentationHighlight } from "@/components/sections/services/TeamAugmentationHighlight";
import { OurProcessSteps } from "@/components/sections/services/OurProcessSteps";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { DEFAULT_SERVICE_DETAILS } from "@/lib/page-defaults";
import { getServicesPageContent } from "@/lib/page-content";
import { buildMetadata, getSeoSettings } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("services");
  return buildMetadata(seo, {
    title: "Services",
    description:
      "From custom software and AI solutions to scalable web and mobile applications, we build technology that helps businesses innovate, grow, and stay ahead of the competition.",
    path: "/services",
  });
}

export default async function ServicesPage() {
  const content = await getServicesPageContent();
  const serviceDetails = content?.serviceDetails?.length
    ? content.serviceDetails
    : DEFAULT_SERVICE_DETAILS;

  return (
    <>
      <Header activePath="/services" />
      <main className="flex-1">
        <ServicesHero title={content?.hero?.title} subtitle={content?.hero?.subtitle} />
        <ServicesOverview intro={content?.overview?.intro} items={content?.overview?.items} />
        {serviceDetails.map((detail, i) => (
          <ServiceDetailSection
            key={detail.title}
            data={detail}
            reverse={i % 2 === 1}
            background={i % 2 === 1 ? "muted" : "white"}
          />
        ))}
        <TeamAugmentationHighlight
          intro={content?.teamAugmentation?.intro}
          stats={content?.teamAugmentation?.stats}
          cards={content?.teamAugmentation?.cards}
        />
        <OurProcessSteps intro={content?.process?.intro} steps={content?.process?.steps} />
        <CtaBanner title={content?.cta?.title} description={content?.cta?.description} />
      </main>
      <Footer />
    </>
  );
}
