export function ServicesHero({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(6,186,181,0.12) 0%, rgba(6,186,181,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #121212 0 1px, transparent 1px 48px), repeating-linear-gradient(90deg, #121212 0 1px, transparent 1px 48px)",
        }}
      />
      <div className="relative mx-auto flex max-w-[941px] flex-col items-center gap-6 text-center">
        <h1 className="text-[36px] font-bold leading-[1.3] text-ink sm:text-[48px] lg:text-[64px]">
          {title ?? "Turning Ideas Into Powerful Digital Solutions"}
        </h1>
        <p className="max-w-[820px] text-base leading-8 text-body">
          {subtitle ??
            "From custom software and AI solutions to scalable web and mobile applications, we build technology that helps businesses innovate, grow, and stay ahead of the competition."}
        </p>
      </div>
    </section>
  );
}
