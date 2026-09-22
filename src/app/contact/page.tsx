import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactFormSection } from "@/components/sections/contact/ContactFormSection";
import { ContactInfoCards } from "@/components/sections/contact/ContactInfoCards";
import { buildMetadata, getSeoSettings } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("contact");
  return buildMetadata(seo, {
    title: "Contact",
    description:
      "Ready to start your next project? Send us a message and we'll respond as soon as possible.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <>
      <Header activePath="/contact" />
      <main className="flex-1 bg-[#f8f8f8]">
        <ContactFormSection />
        <ContactInfoCards />
      </main>
      <Footer />
    </>
  );
}
