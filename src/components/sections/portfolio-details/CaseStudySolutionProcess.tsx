export type CaseStudyProcessStep = { title: string; description: string };

export function CaseStudySolutionProcess({
  solutionSummary,
  steps,
}: {
  solutionSummary: string;
  steps: CaseStudyProcessStep[];
}) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">Our Solution</h2>
          <p className="max-w-[900px] text-base leading-8 text-body">{solutionSummary}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-start gap-6">
              <span className="text-[40px] font-semibold text-primary/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col items-start gap-3">
                <p className="text-xl font-medium leading-8 text-ink">{step.title}</p>
                <p className="text-sm leading-6 text-body">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
