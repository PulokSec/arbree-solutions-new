export type MissionRow = { title: string; description: string };

const DEFAULT_INTRO =
  "Empowering businesses to thrive in the digital age through innovative solutions and strategic excellence";

const DEFAULT_ROWS: MissionRow[] = [
  {
    title: "Unmatched Service",
    description:
      "Support businesses and entrepreneurs with their growth strategy and digital transformation. Our core expertise lies in the ability to support our clients in understanding, analyzing, and executing digital strategies in specific markets.",
  },
  {
    title: "Experience",
    description:
      "Experience in working with and assisting a wide range of clients from international corporations to small/medium-sized businesses, from large enterprises to innovative startups seeking digital solutions.",
  },
  {
    title: "Technology",
    description:
      "The best combination of cutting-edge technology and skilled people to deliver exceptional digital solutions.",
  },
];

export function AboutMission({
  intro = DEFAULT_INTRO,
  rows = DEFAULT_ROWS,
}: {
  intro?: string;
  rows?: MissionRow[];
} = {}) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-8 lg:gap-0">
        <div className="flex w-full flex-col items-start justify-between gap-4 pb-8 lg:flex-row">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
            Our <span className="text-primary">Mission</span>
          </h2>
          <p className="max-w-[644px] text-lg leading-8 text-body lg:text-right">{intro}</p>
        </div>

        <div className="flex w-full flex-col items-start">
          {rows.map((row) => (
            <div key={row.title} className="w-full border-t border-ink/10 py-8">
              <div className="flex flex-col items-start justify-between gap-3 lg:flex-row lg:items-center">
                <p className="w-full max-w-[300px] shrink-0 text-2xl font-medium text-ink sm:text-[28px]">
                  {row.title}
                </p>
                <p className="max-w-[644px] text-base leading-8 text-body lg:text-right">
                  {row.description}
                </p>
              </div>
            </div>
          ))}
          <div className="w-full border-t border-ink/10" />
        </div>
      </div>
    </section>
  );
}
