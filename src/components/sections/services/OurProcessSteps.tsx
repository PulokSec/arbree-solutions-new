import { resolveIcon } from "@/lib/icon-registry";

export type ProcessStepItem = { title: string; description: string; iconKey?: string };

const DEFAULT_INTRO =
  "Every successful product starts with the right process. We collaborate, build, test, and continuously improve to deliver measurable business outcomes";

const DEFAULT_STEPS: ProcessStepItem[] = [
  {
    title: "Your Idea",
    description:
      "Share your business goals, challenges, and vision. We listen, understand, and define the right direction.",
    iconKey: "lightbulb",
  },
  {
    title: "Our Plan",
    description:
      "We analyze your requirements and create a clear roadmap, timeline, and technology strategy.",
    iconKey: "clipboard-list",
  },
  {
    title: "We Design",
    description:
      "Our team crafts intuitive user experiences and scalable system architecture tailored to your needs.",
    iconKey: "pen-tool",
  },
  {
    title: "We Build",
    description:
      "We develop secure, high-performance solutions using modern technologies and agile methodologies.",
    iconKey: "hammer",
  },
  {
    title: "We Test & Deliver",
    description:
      "Every feature is thoroughly tested to ensure quality, reliability, and a smooth deployment.",
    iconKey: "test-tube",
  },
  {
    title: "We Maintain",
    description:
      "We provide continuous support, updates, performance monitoring, and enhancements to keep your product growing.",
    iconKey: "life-buoy",
  },
];

export function OurProcessSteps({
  intro = DEFAULT_INTRO,
  steps = DEFAULT_STEPS,
}: {
  intro?: string;
  steps?: ProcessStepItem[];
} = {}) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">Our Process</h2>
          <p className="max-w-[780px] text-lg leading-8 text-body">{intro}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = resolveIcon(step.iconKey);
            return (
              <div
                key={step.title}
                className="flex flex-col items-start gap-4 rounded-2xl border border-ink/10 bg-[#f8f8f8] p-6"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-6" strokeWidth={1.75} />
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
