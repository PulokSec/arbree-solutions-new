export type CaseStudyStat = { label: string; value: string };

export function CaseStudyOverview({
  overview,
  stats,
}: {
  overview: string;
  stats: CaseStudyStat[];
}) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-10 lg:flex-row lg:justify-between">
        <div className="flex w-full max-w-[735px] flex-col items-start gap-6">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
            Project <span className="text-primary">Overview</span>
          </h2>
          <p className="whitespace-pre-line text-base leading-8 text-body">{overview}</p>
        </div>

        <div className="flex w-full max-w-[551px] flex-col items-center gap-3 rounded-3xl bg-[#f8f8f8] p-6">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex w-full flex-col items-center gap-3">
              <div className="flex w-full items-center justify-between">
                <p className="text-base font-medium text-ink">{stat.label}</p>
                <p className="text-base font-bold text-primary">{stat.value}</p>
              </div>
              {i < stats.length - 1 && <div className="h-px w-full bg-ink/10" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
