export type TeamAugStat = { value: string; label: string };
export type TeamAugCard = { title: string; description: string };

const DEFAULT_INTRO =
  "Scale your team with expert professionals when you need them most. Our team augmentation service allows you to seamlessly integrate skilled professionals into your existing team structure.";

const DEFAULT_STATS: TeamAugStat[] = [
  { value: "72h", label: "Deployment Time" },
  { value: "1000+", label: "Vetted Professionals" },
  { value: "97%", label: "Client Retention" },
];

const DEFAULT_CARDS: TeamAugCard[] = [
  {
    title: "Curated Excellence",
    description:
      "Every professional in our network has passed rigorous technical assessments and cultural fit evaluations. We maintain the highest standards so you don't have to worry about quality.",
  },
  {
    title: "Instant Scalability",
    description:
      "Scale your team up or down based on project demands. Whether you need one specialist or an entire squad, we can deploy the right talent within 72 hours.",
  },
  {
    title: "Seamless Integration",
    description:
      "Our professionals are pre-briefed on best practices and modern collaboration tools. They integrate into your existing processes without disrupting your momentum.",
  },
  {
    title: "Full-Stack Expertise",
    description:
      "From frontend wizards to backend architects, DevOps engineers to product designers—we have specialists across every technology and discipline you need.",
  },
];

export function TeamAugmentationHighlight({
  intro = DEFAULT_INTRO,
  stats = DEFAULT_STATS,
  cards = DEFAULT_CARDS,
}: {
  intro?: string;
  stats?: TeamAugStat[];
  cards?: TeamAugCard[];
} = {}) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-10 lg:gap-[60px]">
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
            Team Augmentation
          </h2>
          <p className="max-w-[644px] text-lg leading-8 text-body">{intro}</p>
        </div>

        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[20px] border border-[#d5d7da] shadow-[0_10px_30px_rgba(6,186,181,0.05)] sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-2 border-b border-[#d5d7da] px-8 py-10 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <p className="text-[40px] font-bold leading-tight text-primary sm:text-[64px]">
                {stat.value}
              </p>
              <p className="text-center text-base text-body">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 overflow-hidden rounded-[20px] border border-[#d5d7da] shadow-[0_10px_30px_rgba(6,186,181,0.05)] sm:grid-cols-2">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="relative isolate flex flex-col items-center gap-6 overflow-hidden border-b border-[#d5d7da] p-10 text-center last:border-b-0 sm:p-[60px] sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div
                className="pointer-events-none absolute -bottom-[104px] -left-[104px] -z-10 size-[130px] rounded-full sm:-bottom-[147px] sm:-left-[147px] sm:size-[207px]"
                style={{
                  backgroundImage:
                    "linear-gradient(123.55deg, rgb(6, 186, 181) 0%, rgb(24, 57, 83) 102.56%)",
                }}
              />
              <div className="flex w-full items-center justify-center gap-2">
                <p className="flex-1 text-left text-2xl font-medium text-ink sm:text-[28px]">
                  {card.title}
                </p>
                <p className="text-3xl font-semibold text-[#d5d7da] sm:text-[48px]">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <p className="text-left text-base leading-8 text-body">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
