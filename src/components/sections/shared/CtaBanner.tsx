import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const GLOBE_IMAGE = "https://www.figma.com/api/mcp/asset/0ecb8bd6-3f69-42f0-a3c5-26a619913f33.png";

export function CtaBanner({
  title = "Ready to Start Your Project?",
  description = "Let's discuss how we can help transform your ideas into exceptional digital solutions that drive your business forward.",
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref,
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <Reveal
        className="relative mx-auto flex max-w-[1320px] items-center overflow-hidden rounded-3xl px-[30px] py-16 lg:px-[60px] lg:py-[104px]"
        style={{
          backgroundImage:
            "linear-gradient(148deg, rgb(6, 186, 181) 0%, rgb(24, 57, 83) 102.56%)",
        }}
      >
        <div className="relative z-10 flex w-full max-w-[588px] flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-4 text-white">
            <p className="text-[32px] font-semibold leading-tight sm:text-[48px]">{title}</p>
            <p className="text-base leading-8">{description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={ctaHref}
              className="flex h-[60px] items-center justify-center rounded-[60px] bg-primary px-[50px] text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              {ctaLabel}
            </Link>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="flex h-[60px] items-center justify-center rounded-[60px] border border-primary bg-white px-[50px] text-base font-medium text-primary transition-opacity hover:opacity-90"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={GLOBE_IMAGE}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-4 left-90 top-1/2 hidden h-[140%] w-auto max-w-none -translate-y-1/2 opacity-90 lg:block"
        />
      </Reveal>
    </section>
  );
}
