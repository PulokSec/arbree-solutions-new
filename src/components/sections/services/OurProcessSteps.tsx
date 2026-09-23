export type ProcessStepItem = { title: string; description: string; iconKey?: string };

const DEFAULT_INTRO =
  "Every successful product starts with the right process. We collaborate, build, test, and continuously improve to deliver measurable business outcomes";

const CHAIN_IMAGE = "/images/services/process-chain.png";

// Real Figma-exported icon SVGs, used only for the mobile/tablet card fallback.
const ICON_BRAIN = "https://www.figma.com/api/mcp/asset/c14f4cdd-c40a-4889-b136-de0e773d6144.svg";
const ICON_SETTINGS = "https://www.figma.com/api/mcp/asset/a9d90166-6a19-4280-a4b8-88ffdf491fc1.svg";
const ICON_LIST = "https://www.figma.com/api/mcp/asset/2d080f36-bd87-4c07-8c7b-257fa0723e20.svg";
const ICON_ROCKET = "https://www.figma.com/api/mcp/asset/f26a26f1-06bd-4819-9e23-e1ea598972d0.svg";
const ICON_WORKFLOW = "https://www.figma.com/api/mcp/asset/2795667f-ef75-4af1-badf-19ee79936526.svg";
const ICON_DATABASE = "https://www.figma.com/api/mcp/asset/00aac2c3-d32c-4ee3-99d2-26f1b3317847.svg";

// left/width are % of the 1320px reference frame — the chain image was exported at that same
// width, so these line the labels up with the connector stubs baked into the image exactly as
// Figma node 867:7290 positions them (left/right values pulled straight from the CSS spec).
const DEFAULT_STEPS: (ProcessStepItem & {
  icon: string;
  position: "top" | "bottom";
  left: number;
  width: number;
})[] = [
  {
    title: "Your Idea",
    description:
      "Share your business goals, challenges, and vision. We listen, understand, and define the right direction.",
    icon: ICON_BRAIN,
    position: "top",
    left: 0,
    width: 205.48,
  },
  {
    title: "We Maintain",
    description:
      "We provide continuous support, updates, performance monitoring, and enhancements to keep your product growing.",
    icon: ICON_SETTINGS,
    position: "bottom",
    left: 257.5,
    width: 243,
  },
  {
    title: "Our Plan",
    description:
      "We analyze your requirements and create a clear roadmap, timeline, and technology strategy.",
    icon: ICON_LIST,
    position: "top",
    left: 491.9,
    width: 205,
  },
  {
    title: "We Test & Deliver",
    description:
      "Every feature is thoroughly tested to ensure quality, reliability, and a smooth deployment.",
    icon: ICON_ROCKET,
    position: "bottom",
    left: 688.9,
    width: 234,
  },
  {
    title: "We Design",
    description:
      "Our team crafts intuitive user experiences and scalable system architecture tailored to your needs.",
    icon: ICON_WORKFLOW,
    position: "top",
    left: 907.5,
    width: 223,
  },
  {
    title: "We Build",
    description:
      "We develop secure, high-performance solutions using modern technologies and agile methodologies.",
    icon: ICON_DATABASE,
    position: "bottom",
    left: 1154,
    width: 206,
  },
];

const FRAME_WIDTH = 1320;

const MOBILE_ORDER = [
  "Your Idea",
  "Our Plan",
  "We Design",
  "We Build",
  "We Test & Deliver",
  "We Maintain",
];

export function OurProcessSteps({
  intro = DEFAULT_INTRO,
}: {
  intro?: string;
  steps?: ProcessStepItem[];
} = {}) {
  const steps = DEFAULT_STEPS;

  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
            Our <span className="text-primary">Process</span>
          </h2>
          <p className="max-w-[780px] text-lg leading-8 text-body">{intro}</p>
        </div>

        {/* Desktop: real Figma chain graphic (node 867:7291) with labels overlaid at the
            connector-stub positions, matching Figma node 867:7290 exactly */}
        <div className="relative mb-[190px] mt-[190px] hidden w-full lg:mb-[210px] lg:mt-[210px] lg:block">
          {steps
            .filter((s) => s.position === "top")
            .map((step) => (
              <div
                key={step.title}
                className="absolute bottom-full flex flex-col items-start gap-1 pb-1 text-left"
                style={{
                  left: `${(step.left / FRAME_WIDTH) * 100}%`,
                  width: `${(step.width / FRAME_WIDTH) * 100}%`,
                }}
              >
                <p className="text-2xl font-medium text-ink">{step.title}</p>
                <p className="text-sm leading-7 text-body">{step.description}</p>
              </div>
            ))}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={CHAIN_IMAGE} alt="" className="w-full select-none" draggable={false} />

          {steps
            .filter((s) => s.position === "bottom")
            .map((step) => (
              <div
                key={step.title}
                className="absolute top-full flex flex-col items-start gap-1 pt-1 text-left"
                style={{
                  left: `${(step.left / FRAME_WIDTH) * 100}%`,
                  width: `${(step.width / FRAME_WIDTH) * 100}%`,
                }}
              >
                <p className="text-2xl font-medium text-ink">{step.title}</p>
                <p className="text-sm leading-7 text-body">{step.description}</p>
              </div>
            ))}
        </div>

        {/* Mobile / tablet: card grid, in logical process order */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {MOBILE_ORDER.map((title, i) => {
            const step = steps.find((s) => s.title === title)!;
            return (
              <div
                key={step.title}
                className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-[#f8f8f8] p-6"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 p-2.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={step.icon} alt="" className="size-full" />
                  </span>
                  <span className="text-sm font-semibold text-primary/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <p className="text-lg font-bold text-ink">{step.title}</p>
                  <p className="text-sm leading-6 text-body">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
