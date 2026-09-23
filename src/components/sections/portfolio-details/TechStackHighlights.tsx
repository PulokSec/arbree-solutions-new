import { Code2, Zap, Shield, Coins } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type TechHighlight = {
  title: string;
  description: string;
  icon: unknown;
  category?: string;
};

const ELLIPSE_7 = "https://www.figma.com/api/mcp/asset/1a3aa538-a0d3-4042-8ad2-c837af8bedd9.svg";
const ELLIPSE_5 = "https://www.figma.com/api/mcp/asset/9eb60164-6fbc-4f32-ac62-c4f2fa657612.svg";
const ELLIPSE_6 = "https://www.figma.com/api/mcp/asset/317348e5-d5a4-4549-b0e3-24d284ffdcec.svg";

const ORBIT_LOGOS = [
  { name: "Python", src: "https://www.figma.com/api/mcp/asset/059a6091-8725-4470-a846-2e9dc0741d07.svg", pos: "left-[68%] top-[13%]" },
  { name: "Django", src: "https://www.figma.com/api/mcp/asset/61c6d59e-69c3-4dbc-ad38-147ce6c797cb.svg", pos: "left-[5%] top-[38%]" },
  { name: "React", src: "https://www.figma.com/api/mcp/asset/fbe7b78d-e88f-4f93-b72b-d58ed581989c.svg", pos: "left-[53%] top-[54%]" },
  { name: "Elasticsearch", src: "https://www.figma.com/api/mcp/asset/439e3fc5-d8ae-404f-81a7-92cb3857808e.svg", pos: "left-[84%] top-[39%]" },
  { name: "Kubernetes", src: "https://www.figma.com/api/mcp/asset/193197c4-19ed-45fc-a9d8-0d732356ee9a.svg", pos: "left-[24%] top-[-4%]" },
  { name: "AWS", src: "https://www.figma.com/api/mcp/asset/f452ddbb-d56d-405d-b8b0-428d25be44f2.svg", pos: "left-[11%] top-[77%]" },
];

const INFO_CARDS = [
  { icon: Code2, iconSrc: "https://www.figma.com/api/mcp/asset/c712d393-4923-4d6c-8dac-10132f25e581.svg", title: "Clean Architecture", description: "Modular, maintainable code structure" },
  { icon: Zap, iconSrc: "https://www.figma.com/api/mcp/asset/498f0329-98be-4071-a610-903ac550e221.svg", title: "High Performance", description: "Optimized for speed and efficiency" },
  { icon: Shield, iconSrc: "https://www.figma.com/api/mcp/asset/e74698c0-1111-4ad9-b75f-4428607a1059.svg", title: "Enterprise Security", description: "Bank-level security protocols" },
  { icon: Coins, iconSrc: "https://www.figma.com/api/mcp/asset/a0f1cb32-f622-480c-beb9-5c000971e60a.svg", title: "Scalable Design", description: "Built to grow with your business" },
];

function OrbitGraphic({ centerLabel }: { centerLabel: string }) {
  return (
    <div className="relative mx-auto size-[300px] shrink-0 sm:size-[380px] lg:size-[434px]">
      <div className="absolute inset-0 rotate-[30deg]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={ELLIPSE_7} className="absolute left-[12.5%] top-[12.5%] w-[75%]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={ELLIPSE_5} className="absolute left-[36.8%] top-[37%] w-[25.5%]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" src={ELLIPSE_6} className="absolute left-[26.3%] top-[26.3%] w-[47%]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[30deg]">
          <p className="whitespace-nowrap text-center text-lg font-medium text-ink sm:text-[28px]">
            {centerLabel}
          </p>
        </div>
        {ORBIT_LOGOS.map((logo) => (
          <div
            key={logo.name}
            className={`absolute flex size-10 -rotate-[30deg] items-center justify-center rounded-full bg-white p-2 shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:size-[52px] ${logo.pos}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.name} title={logo.name} className="size-full" />
          </div>
        ))}
      </div>
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
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-end gap-10 lg:gap-[30px]">
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
                <span className="flex items-center justify-center rounded-2xl bg-primary/15 p-4">
                  <card.icon className="size-8 text-primary" strokeWidth={1.75} />
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
