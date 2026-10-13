import { RichText } from "@/components/RichText";
import { HeroPatternBackground } from "@/components/ui/HeroPatternBackground";

export function ServicesHero({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="relative flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden bg-white px-[30px] py-16 lg:px-[60px] lg:py-[60px]">
      <HeroPatternBackground />
      <div className="relative mx-auto flex w-full max-w-[941px] flex-col items-center gap-6 text-center">
        <h1 className="text-[32px] font-bold leading-[1.3] text-ink sm:text-[48px] lg:text-[64px]">
          {title ?? "Turning Ideas Into Powerful Digital Solutions"}
        </h1>
        <RichText
          className="max-w-[820px]"
          html={
            subtitle ??
            "From custom software and AI solutions to scalable web and mobile applications, we build technology that helps businesses innovate, grow, and stay ahead of the competition."
          }
        />
      </div>
    </section>
  );
}
