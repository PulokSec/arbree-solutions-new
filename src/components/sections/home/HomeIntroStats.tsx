"use client";

import { Boxes, Code2, PenTool, ShieldCheck, LayoutDashboard, Blocks } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useCountUp } from "@/hooks/useCountUp";

export type StatItemData = {
  id: string;
  label: string;
  value: string;
};

const FALLBACK_STATS: StatItemData[] = [
  { id: "1", value: "51+", label: "Reviews" },
  { id: "2", value: "100+", label: "Project Completed" },
  { id: "3", value: "90+", label: "Brands" },
  { id: "4", value: "64+", label: "Tech Stacks" },
];

/* Each ring carries its own icons around with it as it rotates. The icon bubble
   itself spins the opposite way at the same speed so the glyph stays upright
   while it orbits. */
const RING_ORBITS = [
  {
    insetClass: "inset-0",
    borderClass: "border-[#066666]/40",
    durationSec: 40,
    reverse: false,
    icons: [
      { icon: Code2, angle: 20 },
      { icon: Blocks, angle: 200 },
    ],
  },
  {
    insetClass: "inset-[18%]",
    borderClass: "border-primary/30",
    durationSec: 30,
    reverse: true,
    icons: [
      { icon: PenTool, angle: 100 },
      { icon: LayoutDashboard, angle: 280 },
    ],
  },
  {
    insetClass: "inset-[37%]",
    borderClass: "border-amber-400/40",
    durationSec: 40,
    reverse: false,
    icons: [
      { icon: Boxes, angle: 60 },
      { icon: ShieldCheck, angle: 240 },
    ],
  },
] as const;

export function HomeIntroStats({ stats = FALLBACK_STATS }: { stats?: StatItemData[] }) {
  const [reviews, projects, brands, techStacks] = [
    stats[0] ?? FALLBACK_STATS[0],
    stats[1] ?? FALLBACK_STATS[1],
    stats[2] ?? FALLBACK_STATS[2],
    stats[3] ?? FALLBACK_STATS[3],
  ];

  return (
    <section className="flex flex-col items-center gap-16 bg-[#f8f8f8] px-[30px] py-16 lg:flex-row lg:items-center lg:justify-between lg:px-[60px] lg:py-[120px] lg:pr-[144px] container mx-auto">
      {/* Copy */}
      <Reveal className="flex w-full max-w-[561px] flex-col items-start gap-3">
        <div className="flex flex-col items-start gap-1">
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium text-ink">We are</p>
            <p className="text-[40px] font-semibold leading-none text-primary sm:text-[48px]">
              Arbree Solutions
            </p>
          </div>
          <p className="text-base leading-8 text-body">Everyone loves simplicity, so do we.</p>
        </div>
        <p className="text-base leading-8 text-body">
          We are a <span className="font-bold">young, dynamic team</span> coming from a wide
          variety of backgrounds. We use our digital knowledge to help you achieve your business
          goals and grow your business.
        </p>
        <p className="text-base leading-8 text-body">
          Whether you are looking to create a product from scratch or get your branding done,{" "}
          <span className="font-bold">Arbree Solutions will find a way to help you!</span>
        </p>
      </Reveal>

      {/* Animated circle graphic + stat cards */}
      <Reveal
        delay={150}
        className="relative flex w-full max-w-[677px] flex-col items-center justify-center"
      >
        <div className="relative aspect-square w-full max-w-[434px]">
          {/* Dashed concentric rings, each carrying its own icons around as it rotates.
              Clipped to the graphic's own box so the rotated ring wrappers never
              register as horizontal page overflow on narrow screens. */}
          <div className="absolute inset-[22px] overflow-hidden">
            {RING_ORBITS.map(({ insetClass, borderClass, durationSec, reverse, icons }, ringIndex) => (
              <div
                key={ringIndex}
                className={`orbit-ring absolute ${insetClass} rounded-full border border-dashed ${borderClass}`}
                style={
                  {
                    "--orbit-duration": `${durationSec}s`,
                    "--orbit-direction": reverse ? "reverse" : "normal",
                  } as React.CSSProperties
                }
              >
                {icons.map(({ icon: Icon, angle }, iconIndex) => (
                  <div
                    key={iconIndex}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <div
                      className="orbit-icon absolute left-1/2 top-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
                      style={
                        {
                          "--orbit-duration": `${durationSec}s`,
                          "--orbit-icon-direction": reverse ? "normal" : "reverse",
                        } as React.CSSProperties
                      }
                    >
                      <Icon className="size-5 text-primary" strokeWidth={1.75} />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Stat cards, positioned around the circle on large screens */}
          <StatCard
            stat={brands}
            className="animate-float absolute -left-6 top-6 hidden w-[136px] sm:flex lg:-left-10"
            style={{ animationDelay: "0.3s" }}
          />
          <StatCard
            stat={reviews}
            className="animate-float absolute -right-6 top-6 hidden w-[136px] sm:flex lg:-right-14"
            style={{ animationDelay: "1s" }}
          />
          <StatCard
            stat={techStacks}
            className="animate-float absolute -left-6 bottom-6 hidden w-[136px] sm:flex lg:-left-10"
            style={{ animationDelay: "1.7s" }}
          />
          <StatCard
            stat={projects}
            className="animate-float absolute -right-6 bottom-6 hidden w-[136px] sm:flex lg:-right-14"
            style={{ animationDelay: "2.4s" }}
          />
        </div>

        {/* Mobile: simple 2x2 grid instead of absolute overlap */}
        <div className="mt-6 grid w-full max-w-[420px] grid-cols-2 gap-3 sm:hidden">
          {[brands, reviews, techStacks, projects].map((stat) => (
            <StatCard key={stat.id} stat={stat} className="static" />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function StatCard({
  stat,
  className,
  style,
}: {
  stat: StatItemData;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, display } = useCountUp(stat.value);

  return (
    <div
      ref={ref}
      style={style}
      className={`flex w-full max-w-[136px] flex-col items-center justify-center gap-2 rounded-2xl bg-white p-5 text-center shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)] ${className ?? ""}`}
    >
      <p className="text-[40px] font-semibold leading-none text-primary sm:text-[48px]">
        {display}
      </p>
      <p className="text-base leading-8 text-body">{stat.label}</p>
    </div>
  );
}
