export function BlogHero({
  heading,
  subtitle,
}: {
  heading?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="bg-white px-[30px] pb-10 pt-[140px] lg:px-[60px] lg:pb-6 lg:pt-[180px]">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
        <h1 className="text-[36px] font-bold leading-[1.3] text-ink sm:text-[48px] lg:text-[64px]">
          {heading ?? "Insights & Updates"}
        </h1>
        <p className="max-w-[720px] text-base leading-8 text-body">
          {subtitle ??
            "News, engineering deep-dives, and lessons from building software and teams at Arbree Solutions."}
        </p>
      </div>
    </section>
  );
}
