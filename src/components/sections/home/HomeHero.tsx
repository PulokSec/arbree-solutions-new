import Link from "next/link";
import { ArrowUpRight, Code2, Users } from "lucide-react";
import { TrustedByClients, type ClientLogoItem } from "./TrustedByClients";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/RichText";
import type { HomePageContent } from "@/lib/page-content";

type Capability = {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlighted?: boolean;
};

const CAPABILITIES: Capability[] = [
  {
    title: "Dedicated Team",
    description: "Build a dedicated team tailored to your project requirements.",
    icon: <Users className="size-full" strokeWidth={1.75} />,
  },
  {
    title: "Resource Augmentation",
    description: "Add skilled professionals to your existing team and scale instantly.",
    icon: <Users className="size-full" strokeWidth={1.75} />,
  },
  {
    title: "Software Development",
    description: "End-to-end software development that delivers scalable and reliable products.",
    icon: <Code2 className="size-4" strokeWidth={1.75} />,
    highlighted: true,
  },
];

export function HomeHero({
  clientLogos,
  content,
}: {
  clientLogos?: ClientLogoItem[];
  content?: HomePageContent["hero"];
}) {
  const hero = content ?? {};
  return (
    <section className="relative overflow-hidden bg-white pt-[66px] pb-8 sm:pt-[130px]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-[30px] lg:grid-cols-[747px_1fr] lg:gap-0 lg:px-[60px]">
        {/* Copy + CTAs */}
        <Reveal className="flex flex-col items-start gap-[30px]">
          <div className="flex flex-col items-start gap-6">
            <span className="flex items-center gap-2 rounded-2xl border border-primary bg-white px-2 py-[6px]">
              <span className="size-4 rounded-2xl border border-white bg-primary" />
              <span className="text-sm font-medium text-primary">
                {hero.badge ?? "Technology Solutions That Drive Growth"}
              </span>
            </span>

            <div className="flex flex-col items-start gap-2">
              <h1 className="text-[28px] font-bold leading-[1.3] text-ink sm:text-[52px] lg:text-[64px]">
                {hero.titleLine1 ?? "Scale Your Tech Team"}
                <br />
                With{" "}
                <span className="text-primary">{hero.titleHighlight ?? "Dedicated Experts"}</span>
              </h1>
              <RichText
                html={
                  hero.subtitle ??
                  "We provide Software Development, Resource Augmentation, QA, DevOps and Mobile Solutions that seamlessly integrate with your business and accelerate product delivery."
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-[18px]">
            <Link
              href={hero.primaryHref ?? "/services#tech-solution"}
              className="flex h-12 sm:h-[60px] items-center justify-center rounded-[60px] bg-primary px-[50px] text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              {hero.primaryLabel ?? "Tech Solution"}
            </Link>
            <Link
              href={hero.secondaryHref ?? "/services#team-augmentation"}
              className="flex h-12 sm:h-[60px] items-center justify-center rounded-[60px] border border-primary bg-white px-[50px] text-base font-medium text-primary transition-colors hover:bg-primary-soft"
            >
              {hero.secondaryLabel ?? "Team Augmentation"}
            </Link>
          </div>
        </Reveal>

        {/* Floating capability cards */}
        <Reveal delay={150} className="relative flex justify-center lg:justify-end">
          <div className="animate-float flex w-[282px] flex-col gap-[10px] rounded-[20px] border border-black/[0.04] bg-white p-5 shadow-[0px_0px_125px_0px_rgba(4, 124, 120, 0.24)] [box-shadow:inset_0px_0px_10.2px_0px_rgba(6,186,181,0.13)]">
            {CAPABILITIES.map((capability) => (
              <div
                key={capability.title}
                className="flex w-full items-center rounded-[10px] border border-primary/20 bg-white p-[10px]"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
                  <span
                    className={
                      capability.highlighted
                        ? "flex size-[34px] items-center justify-center rounded shadow-[0px_0px_4px_0px_rgba(0,0,0,0.1)] bg-primary-soft text-primary"
                        : "flex size-[34px] items-center justify-center text-primary"
                    }
                  >
                    {capability.icon}
                  </span>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-[10px]">
                      <p className="whitespace-nowrap text-base font-bold text-ink">
                        {capability.title}
                      </p>
                      <ArrowUpRight className="size-6 text-primary" strokeWidth={1.75} />
                    </div>
                    <p className="text-sm leading-6 text-body">{capability.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <TrustedByClients logos={clientLogos} />
    </section>
  );
}
