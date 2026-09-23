export function PortfolioHero({
  heading,
  subtitle,
}: {
  heading?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="bg-white px-5 pb-8 pt-[120px] sm:px-[30px] sm:pb-10 sm:pt-[140px] lg:px-[60px] lg:pb-6 lg:pt-[180px]">
      <div className="mx-auto flex max-w-[1143px] flex-col items-center gap-4 text-center sm:gap-6">
        <h1 className="text-[28px] font-bold leading-[1.3] tracking-[-0.7px] text-ink sm:text-[48px] sm:tracking-normal lg:text-[64px]">
          {heading ?? "Technology Solutions & Engineering Teams That Scale Your Business"}
        </h1>
        <p className="max-w-[900px] text-sm leading-7 text-body sm:text-base sm:leading-8">
          {subtitle ??
            "Explore our portfolio of enterprise platforms, web applications, mobile solutions, and successful technology partnerships that deliver lasting business value. From custom software development and MVPs to dedicated engineering teams, we help businesses innovate faster, scale efficiently, and achieve measurable results through modern technology."}
        </p>
      </div>
    </section>
  );
}
