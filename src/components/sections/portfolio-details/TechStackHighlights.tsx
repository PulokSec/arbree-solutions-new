import { Reveal } from "@/components/ui/Reveal";

export type TechHighlight = {
  title: string;
  description: string;
  icon: unknown;
  category?: string;
};

const TECH = "/images/portfolio/tech";

// Orbit logos placed per the Figma "Technology Stack" frame: left/top are the logo circle's
// top-left as a % of the 434px orbit box (circle diameter 58px).
const ORBIT_LOGOS = [
  { name: "Kubernetes", src: `${TECH}/kubernetes.svg`, pos: "left-[52.5%] top-[-6%]" },
  { name: "Django", src: `${TECH}/django.svg`, pos: "left-[11.3%] top-[23.3%]" },
  { name: "Python", src: `${TECH}/python.svg`, pos: "left-[77.4%] top-[29.3%]" },
  { name: "React", src: `${TECH}/react.svg`, pos: "left-[48.6%] top-[65.4%]" },
  { name: "Elasticsearch", src: `${TECH}/elasticsearch.svg`, pos: "left-[87.6%] top-[68.7%]" },
  { name: "AWS", src: `${TECH}/aws.svg`, pos: "left-[8.3%] top-[82%]" },
];

const INFO_CARDS = [
  { iconSrc: `${TECH}/icon-code.svg`, title: "Clean Architecture", description: "Modular, maintainable code structure" },
  { iconSrc: `${TECH}/icon-bolt.svg`, title: "High Performance", description: "Optimized for speed and efficiency" },
  { iconSrc: `${TECH}/icon-shield.svg`, title: "Enterprise Security", description: "Bank-level security protocols" },
  { iconSrc: `${TECH}/icon-coins.svg`, title: "Scalable Design", description: "Built to grow with your business" },
];

function OrbitGraphic({ centerLabel }: { centerLabel: string }) {
  return (
    <div className="relative mx-auto size-[300px] shrink-0 sm:size-[380px] lg:size-[434px]">
      {/* Four concentric dashed rings (outer ring is a plain dashed border; the others are the
          exported Figma ring SVGs). */}
      <div className="absolute inset-0 rounded-full border border-dashed border-[#006666]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={`${TECH}/ring-blue.svg`} className="absolute left-[12.6%] top-[12.6%] w-[74.7%]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={`${TECH}/ring-orange.svg`} className="absolute left-[26.4%] top-[26.4%] w-[47.2%]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" src={`${TECH}/ring-teal.svg`} className="absolute left-[37.1%] top-[37.1%] w-[25.7%]" />
      <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-lg font-medium text-ink sm:text-[28px]">
        {centerLabel}
      </p>
      {ORBIT_LOGOS.map((logo) => (
        <div
          key={logo.name}
          className={`absolute flex size-10 items-center justify-center rounded-full bg-white p-2 shadow-[0_4px_12px_rgba(0,0,0,0.12)] sm:size-[52px] lg:size-[58px] lg:p-[14px] ${logo.pos}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.src} alt={logo.name} title={logo.name} className="size-full object-contain" />
        </div>
      ))}
    </div>
  );
}

export function TechStackHighlights({
  title,
  description,
}: {
  title: string;
  description: string;
  highlights?: TechHighlight[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#f8f8f8] px-[30px] py-12 sm:py-16 lg:p-[60px]">
      {/* faint blueprint grid fading out from the top-left corner, as in the design */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #121212 0 1px, transparent 1px 32px), repeating-linear-gradient(90deg, #121212 0 1px, transparent 1px 32px)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-end gap-10 lg:gap-[30px]">
        <Reveal className="flex max-w-[764px] flex-col items-start gap-3 lg:gap-[14px]">
          <h2 className="text-[32px] font-semibold text-ink sm:text-[40px] lg:text-[48px]">
            {title}
          </h2>
          <p className="text-base leading-8 text-body">{description}</p>
        </Reveal>

        <div className="flex w-full flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-[70px]">
          <Reveal>
            <OrbitGraphic centerLabel="CRM" />
          </Reveal>

          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2">
            {INFO_CARDS.map((card, i) => (
              <Reveal
                key={card.title}
                delay={i * 100}
                className="flex flex-col items-start justify-center gap-5 rounded-[20px] border border-ink/15 bg-white p-6 lg:p-[30px]"
              >
                <span className="flex items-center justify-center rounded-2xl bg-primary/15 p-[15px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.iconSrc} alt="" aria-hidden className="size-8" />
                </span>
                <div className="flex flex-col items-start gap-3">
                  <p className="text-base font-bold text-ink">{card.title}</p>
                  <p className="text-base leading-8 text-body">{card.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
