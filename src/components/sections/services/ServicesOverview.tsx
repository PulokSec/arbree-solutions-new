"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { resolveIcon } from "@/lib/icon-registry";
import { useInView } from "@/hooks/useInView";
import { Reveal } from "@/components/ui/Reveal";

export type TitleSegment = { text: string; accent?: boolean };

export type ServiceOverviewItem = {
  title: string;
  /** The title split into plain/accent-colored runs, e.g. [{text:"Digital "},{text:"Consultancy",accent:true}]. Falls back to a plain `title` when omitted. */
  titleSegments?: TitleSegment[];
  description: string;
  iconKey?: string;
  /** Path to a self-contained circular badge SVG (icon + colored background baked in), exported from Figma. */
  iconSrc?: string;
  /** Path to a plain glyph SVG with no background, rendered inside a colored circle. */
  glyphSrc?: string;
  href?: string;
  accent?: "amber" | "navy" | "teal";
};

const DEFAULT_INTRO =
  "We follow a proven methodology to transform your ideas into exceptional digital solutions that deliver results";

const ICONS_BASE = "/images/icons/services";
const DECOR_BASE = "/images/icons/decor";

const DEFAULT_ITEMS: ServiceOverviewItem[] = [
  {
    title: "Digital Consultancy",
    titleSegments: [{ text: "Digital " }, { text: "Consultancy", accent: true }],
    description: "Strategic digital transformation",
    iconKey: "compass",
    iconSrc: `${ICONS_BASE}/digital-consultancy.svg`,
    href: "/services#digital-consultancy",
    accent: "navy",
  },
  {
    title: "UI/UX Design",
    titleSegments: [{ text: "UI/UX ", accent: true }, { text: "Design" }],
    description: "User-centered design solutions",
    iconKey: "pen-tool",
    iconSrc: `${ICONS_BASE}/ui-ux-design.svg`,
    href: "/services#ui-ux-design",
    accent: "navy",
  },
  {
    title: "Web Development",
    titleSegments: [{ text: "Web", accent: true }, { text: " Development" }],
    description: "Modern and Scalable Web Applications",
    iconKey: "globe",
    iconSrc: `${ICONS_BASE}/web-development.svg`,
    href: "/services#web-development",
    accent: "amber",
  },
  {
    title: "Mobile Apps",
    titleSegments: [{ text: "Mobile", accent: true }, { text: " Apps" }],
    description: "iOS & Android development",
    iconKey: "smartphone",
    iconSrc: `${ICONS_BASE}/mobile-apps.svg`,
    href: "/services#mobile-app-development",
    accent: "navy",
  },
  {
    title: "MVP Development",
    titleSegments: [{ text: "MVP " }, { text: "Development", accent: true }],
    description: "Strategic digital transformation",
    iconKey: "rocket",
    iconSrc: `${ICONS_BASE}/mvp-development.svg`,
    href: "/contact",
    accent: "navy",
  },
  {
    title: "Team Augmentation",
    titleSegments: [{ text: "Team " }, { text: "Augmentation", accent: true }],
    description: "Skilled development teams",
    iconKey: "users",
    iconSrc: `${ICONS_BASE}/team-augmentation.svg`,
    href: "/contact",
    accent: "amber",
  },
  {
    title: "QA & Maintenance",
    titleSegments: [{ text: "QA & " }, { text: "Maintenance", accent: true }],
    description: "Strategic digital transformation",
    iconKey: "wrench",
    glyphSrc: `${ICONS_BASE}/qa-maintenance.svg`,
    href: "/contact",
    accent: "navy",
  },
  {
    title: "Software Development",
    titleSegments: [{ text: "Software " }, { text: "Development", accent: true }],
    description: "Modern and Scalable Desktop Applications",
    iconKey: "code-2",
    glyphSrc: `${ICONS_BASE}/software-development.svg`,
    href: "/contact",
    accent: "amber",
  },
];

const ACCENT_CLASSES: Record<NonNullable<ServiceOverviewItem["accent"]>, string> = {
  amber: "bg-[#ffb636]",
  navy: "bg-[#116699]",
  teal: "bg-primary",
};

const ORBIT_BADGE_CLASS =
  "shadow-[0_10px_25px_rgba(18,18,18,0.15)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_14px_32px_rgba(6,186,181,0.35)] group-focus-visible:scale-110 group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-primary group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-[#f8f8f8]";

/** Renders a service's badge: the Figma-exported artwork when available, else a lucide glyph in a colored circle. */
function ServiceBadge({
  item,
  size,
  className = "",
  FallbackIcon,
}: {
  item: ServiceOverviewItem;
  size: number;
  className?: string;
  /** Resolved lucide icon to use when neither iconSrc nor glyphSrc is set. Resolved by the caller so this component never manufactures one itself during render. */
  FallbackIcon: LucideIcon;
}) {
  if (item.iconSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={item.iconSrc}
        alt=""
        className={`block shrink-0 rounded-full ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  const accentClass = ACCENT_CLASSES[item.accent ?? "teal"];
  const glyphSize = Math.round(size * (item.glyphSrc ? 0.37 : 0.45));

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full text-white ${accentClass} ${className}`}
      style={{ width: size, height: size }}
    >
      {item.glyphSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.glyphSrc} alt="" style={{ width: glyphSize, height: glyphSize }} />
      ) : (
        <FallbackIcon style={{ width: glyphSize, height: glyphSize }} strokeWidth={1.75} />
      )}
    </span>
  );
}

/** Renders a title as plain/accent-colored runs, e.g. "Digital <teal>Consultancy</teal>". */
function ServiceTitle({ item, className = "" }: { item: ServiceOverviewItem; className?: string }) {
  if (!item.titleSegments) return <span className={className}>{item.title}</span>;

  return (
    <span className={className}>
      {item.titleSegments.map((segment, i) => (
        <span key={i} className={segment.accent ? "text-primary" : undefined}>
          {segment.text}
        </span>
      ))}
    </span>
  );
}

/** A left/right-column service row: icon and text side by side, text always left-aligned per the Figma spec. */
function SideRow({
  item,
  FallbackIcon,
  iconFirst,
  width,
  inView,
  delayMs,
  className = "",
}: {
  item: ServiceOverviewItem;
  FallbackIcon: LucideIcon;
  iconFirst: boolean;
  width: number;
  inView: boolean;
  delayMs: number;
  className?: string;
}) {
  return (
    <Link
      href={item.href ?? "/contact"}
      aria-label={`View ${item.title} service`}
      className={`group flex items-center gap-3 transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      } ${className}`}
      style={{ width, transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
    >
      {iconFirst && <ServiceBadge item={item} size={84} FallbackIcon={FallbackIcon} className={ORBIT_BADGE_CLASS} />}
      <span className="flex flex-col items-start gap-1.5">
        <ServiceTitle
          item={item}
          className="text-lg font-semibold leading-8 text-ink transition-colors duration-300 group-hover:text-primary"
        />
        <p className="text-xs leading-6 text-body">{item.description}</p>
      </span>
      {!iconFirst && <ServiceBadge item={item} size={84} FallbackIcon={FallbackIcon} className={ORBIT_BADGE_CLASS} />}
    </Link>
  );
}

/** The top/bottom middle-column service items: text and icon stacked, centered. */
function StackedItem({
  item,
  FallbackIcon,
  iconFirst,
  inView,
  delayMs,
}: {
  item: ServiceOverviewItem;
  FallbackIcon: LucideIcon;
  iconFirst: boolean;
  inView: boolean;
  delayMs: number;
}) {
  return (
    <Link
      href={item.href ?? "/contact"}
      aria-label={`View ${item.title} service`}
      className={`group flex w-[173px] flex-col items-center gap-3 transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
      style={{ transitionDelay: inView ? `${delayMs}ms` : "0ms" }}
    >
      {iconFirst && <ServiceBadge item={item} size={84} FallbackIcon={FallbackIcon} className={ORBIT_BADGE_CLASS} />}
      <span className="flex flex-col items-center gap-1.5 text-center">
        <ServiceTitle
          item={item}
          className="text-lg font-semibold leading-8 text-ink transition-colors duration-300 group-hover:text-primary"
        />
        <p className="text-xs leading-6 text-body">{item.description}</p>
      </span>
      {!iconFirst && <ServiceBadge item={item} size={84} FallbackIcon={FallbackIcon} className={ORBIT_BADGE_CLASS} />}
    </Link>
  );
}

/** Decorative gear cluster (small, top-left composition), exported directly from the Figma background art. */
function GearClusterSmall({ className = "" }: { className?: string }) {
  const pieces = [
    { src: "gear-cluster-a-1.svg", inset: "65.9% 6.38% 0.6% 48.94%" },
    { src: "gear-cluster-a-2.svg", inset: "65.3% 5.58% 0% 48.14%" },
    { src: "gear-cluster-a-3.svg", inset: "0% 0% 48.31% 31.05%" },
    { src: "gear-cluster-a-4.svg", inset: "41.16% 64.44% 32.17% 0%" },
  ];

  return (
    <div aria-hidden className={`pointer-events-none h-[169px] w-[127px] ${className}`}>
      {pieces.map((piece) => (
        <div key={piece.src} className="absolute" style={{ inset: piece.inset }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${DECOR_BASE}/${piece.src}`} alt="" className="block size-full max-w-none" />
        </div>
      ))}
    </div>
  );
}

/** Decorative gear cluster (large, bottom-right composition), exported directly from the Figma background art. */
function GearClusterLarge({ className = "" }: { className?: string }) {
  const pieces = [
    { src: "gear-cluster-b-1.svg", inset: "37.14% 23.08% 0.6% 0.74%" },
    { src: "gear-cluster-b-2.svg", inset: "36.53% 22.33% 0% 0%" },
    { src: "gear-cluster-b-3.svg", inset: "9.05% 0% 55.2% 56.26%" },
    { src: "gear-cluster-b-4.svg", inset: "0% 55.37% 73.08% 11.68%" },
  ];

  return (
    <div aria-hidden className={`pointer-events-none h-[212px] w-[216px] ${className}`}>
      {pieces.map((piece) => (
        <div key={piece.src} className="absolute" style={{ inset: piece.inset }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${DECOR_BASE}/${piece.src}`} alt="" className="block size-full max-w-none" />
        </div>
      ))}
    </div>
  );
}

export function ServicesOverview({
  intro = DEFAULT_INTRO,
  items = DEFAULT_ITEMS,
}: {
  intro?: string;
  items?: ServiceOverviewItem[];
} = {}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  // The pixel-precise orbit layout mirrors the Figma auto-layout 1:1 (columns, gaps, paddings) and
  // only makes sense for exactly this 8-item arrangement; anything else falls back to the grid.
  const showOrbit = items.length === 8;
  const resolved = items.map((item) => ({ item, FallbackIcon: resolveIcon(item.iconKey) }));
  const [digitalConsultancy, uiUxDesign, webDevelopment, mobileApps, mvpDevelopment, teamAugmentation, qaMaintenance, softwareDevelopment] =
    resolved;

  return (
    <section className="relative overflow-hidden bg-[#f8f8f8] px-[30px] py-16 lg:p-[60px]">
      <GearClusterSmall className="absolute left-60 top-60 hidden xl:block" />
      <GearClusterLarge className="absolute bottom-10 right-60 hidden xl:block" />

      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center gap-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
            What We <span className="text-primary">Do Best</span>
          </h2>
          <p className="max-w-[720px] text-lg leading-8 text-body">{intro}</p>
        </Reveal>

        {/* Orbit layout: reproduces Figma's exact 1150.32x846.49 composition (rings, hub, 3 columns). */}
        {showOrbit && (
          <div ref={ref} className="relative hidden xl:block" style={{ width: 1150.32, height: 846.49 }}>
            {/* Rings + hub, concentric within the 620px dashed circle (Frame 44) */}
            <div
              className="orbit-ring absolute rounded-full border-2 border-dashed border-ink/20"
              style={{ width: 620, height: 620, left: 265, top: 113, "--orbit-duration": "70s" } as React.CSSProperties}
            />
            <div
              className="absolute rounded-full border-2 border-dashed border-ink/20"
              style={{ width: 460, height: 460, left: 265 + 80, top: 113 + 80 }}
            />
            <div
              className="absolute rounded-full border-2 border-dashed border-ink/20"
              style={{ width: 348, height: 348, left: 265 + 136, top: 113 + 136 }}
            />
            <div
              className="absolute flex items-center justify-center rounded-full bg-primary shadow-[0_25px_60px_rgba(6,186,181,0.35)]"
              style={{ width: 240, height: 240, left: 265 + 190, top: 113 + 190 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ICONS_BASE}/hub-icon.svg`} alt="" style={{ width: 113, height: 108 }} />
            </div>

            {/* Icon columns (Frame 45): left / middle (top+bottom) / right, exactly per the Figma auto-layout */}
            <div
              className="absolute flex flex-row items-center justify-center"
              style={{ left: 32, top: -27, width: 1131.32, height: 891.49, gap: 134 }}
            >
              <div className="flex flex-col" style={{ width: 330, gap: 76 }}>
                <SideRow item={softwareDevelopment.item} FallbackIcon={softwareDevelopment.FallbackIcon} iconFirst={false} width={330} inView={inView} delayMs={0} />
                <SideRow item={qaMaintenance.item} FallbackIcon={qaMaintenance.FallbackIcon} iconFirst={false} width={330} inView={inView} delayMs={80} className="justify-end pr-[50px]" />
                <SideRow item={teamAugmentation.item} FallbackIcon={teamAugmentation.FallbackIcon} iconFirst={false} width={330} inView={inView} delayMs={160} className="justify-end" />
              </div>

              <div className="flex flex-col items-center" style={{ width: 173, gap: 560 }}>
                <StackedItem item={digitalConsultancy.item} FallbackIcon={digitalConsultancy.FallbackIcon} iconFirst={false} inView={inView} delayMs={240} />
                <StackedItem item={mvpDevelopment.item} FallbackIcon={mvpDevelopment.FallbackIcon} iconFirst={true} inView={inView} delayMs={560} />
              </div>

              <div className="flex flex-col items-start" style={{ width: 360.32, gap: 76 }}>
                <SideRow item={uiUxDesign.item} FallbackIcon={uiUxDesign.FallbackIcon} iconFirst={true} width={264.32} inView={inView} delayMs={320} />
                <SideRow item={webDevelopment.item} FallbackIcon={webDevelopment.FallbackIcon} iconFirst={true} width={360.32} inView={inView} delayMs={400} className="pl-[50px]" />
                <SideRow item={mobileApps.item} FallbackIcon={mobileApps.FallbackIcon} iconFirst={true} width={360.32} inView={inView} delayMs={480} />
              </div>
            </div>
          </div>
        )}

        {/* Grid fallback: shown below xl, or whenever a non-default item count is supplied. */}
        <div className={`grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 ${showOrbit ? "xl:hidden" : ""}`}>
          {items.map((item) => {
            const FallbackIcon = resolveIcon(item.iconKey);

            return (
              <Link
                key={item.title}
                href={item.href ?? "/contact"}
                aria-label={`View ${item.title} service`}
                className="group flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,186,181,0.12)]"
              >
                <ServiceBadge
                  item={item}
                  size={64}
                  FallbackIcon={FallbackIcon}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="flex flex-col items-start gap-1">
                  <ServiceTitle
                    item={item}
                    className="text-lg font-bold text-ink transition-colors duration-300 group-hover:text-primary"
                  />
                  <p className="text-sm leading-6 text-body">{item.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
