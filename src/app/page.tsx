import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIntroStats } from "@/components/sections/home/HomeIntroStats";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { HomeOurWork } from "@/components/sections/home/HomeOurWork";
import { HomeTestimonial } from "@/components/sections/home/HomeTestimonial";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import {
  getHomeStats,
  getHomeServices,
  getHomePortfolioItems,
  getTestimonials,
  getClientLogos,
} from "@/lib/cms";
import { getHomePageContent } from "@/lib/page-content";
import { buildMetadata, getSeoSettings } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("home");
  return buildMetadata(seo, {
    title: "Scale Your Tech Team With Dedicated Experts",
    description:
      "Software Development, Resource Augmentation, QA, DevOps and Mobile Solutions that seamlessly integrate with your business and accelerate product delivery.",
    path: "/",
  });
}

export default async function Home() {
  const [stats, services, portfolioItems, testimonials, clientLogos, content] = await Promise.all([
    getHomeStats(),
    getHomeServices(),
    getHomePortfolioItems(),
    getTestimonials(),
    getClientLogos(),
    getHomePageContent(),
  ]);

  return (
    <>
      <Header activePath="/" />
      <main className="flex-1">
        <HomeHero clientLogos={clientLogos} content={content?.hero} />
        <HomeIntroStats stats={stats} content={content?.intro} />
        <HomeServices services={services} content={content?.services} />
        <HomeOurWork items={portfolioItems} content={content?.ourWork} />
        <HomeTestimonial testimonials={testimonials} heading={content?.testimonial?.heading} />
        <CtaBanner title={content?.cta?.title} description={content?.cta?.description} />
      </main>
      <Footer />
    </>
  );
}
