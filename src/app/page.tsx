import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeIntroStats } from "@/components/sections/home/HomeIntroStats";
import { HomeServices } from "@/components/sections/home/HomeServices";
import { HomeOurWork } from "@/components/sections/home/HomeOurWork";
import { HomeTestimonial } from "@/components/sections/home/HomeTestimonial";
import {
  getHomeStats,
  getHomeServices,
  getHomePortfolioItems,
  getTestimonials,
  getClientLogos,
} from "@/lib/cms";
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
  const [stats, services, portfolioItems, testimonials, clientLogos] = await Promise.all([
    getHomeStats(),
    getHomeServices(),
    getHomePortfolioItems(),
    getTestimonials(),
    getClientLogos(),
  ]);

  return (
    <>
      <Header activePath="/" />
      <main className="flex-1">
        <HomeHero clientLogos={clientLogos} />
        <HomeIntroStats stats={stats} />
        <HomeServices services={services} />
        <HomeOurWork items={portfolioItems} />
        <HomeTestimonial testimonials={testimonials} />
      </main>
      <Footer />
    </>
  );
}
