import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { ServicesOverview } from "@/components/sections/services/ServicesOverview";
import {
  ServiceDetailSection,
  type ServiceDetailData,
} from "@/components/sections/services/ServiceDetailSection";
import { TeamAugmentationHighlight } from "@/components/sections/services/TeamAugmentationHighlight";
import { OurProcessSteps } from "@/components/sections/services/OurProcessSteps";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
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

const UI_UX_DESIGN: ServiceDetailData = {
  title: "UI/UX Design",
  description:
    "We help businesses design intuitive and innovative interfaces that leave a lasting impression. Whether it's a web application, mobile app, or complex dashboard, our process focuses on combining functionality with aesthetics to meet your business goals.",
  image: "https://www.figma.com/api/mcp/asset/24d1b6e9-d21e-4166-b18d-2fc25e48e409.png",
  benefits: [
    "User-centered design approach",
    "Responsive design for all devices",
    "Prototyping and wireframing",
    "Design system development",
  ],
  gallery: [
    "https://www.figma.com/api/mcp/asset/71999784-50c4-4b55-b076-05baf6825ca3.png",
    "https://www.figma.com/api/mcp/asset/ce6bac17-1c84-47f0-b9b8-fc159aa81301.png",
    "https://www.figma.com/api/mcp/asset/0fd73a2b-3c93-4e6c-9ffd-bbfe7fc404d1.png",
    "https://www.figma.com/api/mcp/asset/1099e96e-82d6-4cf3-9789-aafe91f93a9b.png",
  ],
};

const WEB_DEVELOPMENT: ServiceDetailData = {
  title: "Web Development",
  description:
    "We understand the challenges of creating scalable, user-friendly web platforms that solve real-world problems. At Arbree Solutions, we specialize in crafting web applications that not only look stunning but also simplify complex workflows for your users.",
  image: "https://www.figma.com/api/mcp/asset/c9c57195-54cc-43f2-be8a-2481ca40778d.png",
  benefits: [
    "Custom web applications",
    "E-commerce solutions",
    "CMS development",
    "API integration",
  ],
  gallery: [
    "https://www.figma.com/api/mcp/asset/e3e52b49-60b2-4896-aa01-a99ca7cfaa0c.png",
    "https://www.figma.com/api/mcp/asset/6cf7eef7-c2d9-4b6d-8e1b-4c2cf406fe9e.png",
    "https://www.figma.com/api/mcp/asset/bc2ce9cc-c9b4-4023-85fe-d6915928e3ac.png",
    "https://www.figma.com/api/mcp/asset/46a9d626-c1d7-4681-a4fc-c18f96366d46.png",
  ],
};

const MOBILE_APP_DEVELOPMENT: ServiceDetailData = {
  title: "Mobile App Development",
  description:
    "We help businesses design intuitive and innovative mobile applications that leave a mark. Whether it's an iOS app, Android application, or cross-platform solution, our process focuses on combining functionality with aesthetics to meet your business goals.",
  image: "https://www.figma.com/api/mcp/asset/579dd4ac-44be-41d9-a10c-9fc34333aaaf.png",
  benefits: [
    "iOS & Android development",
    "Cross-platform solutions",
    "App store optimization",
    "Mobile UI/UX design",
  ],
  gallery: [
    "https://www.figma.com/api/mcp/asset/1ac24c93-0031-4ed1-b567-d922d382efe1.png",
    "https://www.figma.com/api/mcp/asset/6116b8a5-cfc8-475f-a605-d9fc556b4471.png",
    "https://www.figma.com/api/mcp/asset/cc945c37-6ed4-4e8f-8327-9d37c8d0c9f2.png",
    "https://www.figma.com/api/mcp/asset/8dd57906-3061-4b92-9ca8-6951980a6758.png",
  ],
};

const DIGITAL_CONSULTANCY: ServiceDetailData = {
  title: "Digital Consultancy",
  description:
    "Your digital transformation is more than a technology upgrade; it's the evolution of your business. At Arbree Solutions, we specialize in providing strategic guidance that combines innovative thinking with practical implementation.",
  image: "https://www.figma.com/api/mcp/asset/49fd4682-71b6-405d-a71f-5dd94761b417.png",
  benefits: [
    "Digital strategy planning",
    "Technology assessment",
    "Business process optimization",
    "Implementation roadmaps",
  ],
};

const DEFAULT_SERVICE_DETAILS: ServiceDetailData[] = [
  UI_UX_DESIGN,
  WEB_DEVELOPMENT,
  MOBILE_APP_DEVELOPMENT,
  DIGITAL_CONSULTANCY,
];

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
        <CtaBanner
          title={content?.cta?.title ?? "Ready to Transform Your Ideas?"}
          description={
            content?.cta?.description ??
            "Let's discuss how we can help you achieve your digital goals with our exceptional services"
          }
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
