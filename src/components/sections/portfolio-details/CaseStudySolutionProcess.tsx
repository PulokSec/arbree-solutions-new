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
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-10 lg:gap-14">
        <div className="flex flex-col items-center gap-4 text-center lg:gap-5">
          <h2 className="text-[32px] font-semibold text-ink sm:text-[40px] lg:text-[48px]">
            Our <span className="text-primary">Solution</span>
          </h2>
          <p className="max-w-[900px] text-base leading-8 text-body">{solutionSummary}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex flex-col items-start gap-8 overflow-hidden rounded-[20px] border border-[#D5D7DA] bg-white p-5 lg:min-h-[504px]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-[130px] size-[207px] rounded-full"
                style={{
                  backgroundImage:
                    "linear-gradient(123.55deg, rgb(6, 186, 181) 0%, rgb(24, 57, 83) 102.56%)",
                }}
              />
              <div className="relative flex w-full items-center justify-end">
                <p className="absolute -top-[15px] right-0 text-[40px] font-semibold leading-[1.5] text-white">
                  {String(i + 1).padStart(2, "0")}
                </p>
              </div>
              <div className="relative z-10 flex flex-col items-start gap-3 my-7">
                <p className="text-base font-bold leading-8 text-ink">{step.title}</p>
                <p className="text-base leading-8 text-body">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
