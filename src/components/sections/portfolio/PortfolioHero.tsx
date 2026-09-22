export function PortfolioHero({
  heading,
  subtitle,
}: {
  heading?: string;
  subtitle?: string;
} = {}) {
  return (
    <section className="bg-white px-[30px] pb-10 pt-[140px] lg:px-[60px] lg:pb-6 lg:pt-[180px]">
      <div className="mx-auto flex max-w-[1143px] flex-col items-center gap-6 text-center">
        <h1 className="text-[36px] font-bold leading-[1.3] text-ink sm:text-[48px] lg:text-[64px]">
          {heading ?? "Technology Solutions & Engineering Teams That Scale Your Business"}
        </h1>
        <p className="max-w-[900px] text-base leading-8 text-body">
          {subtitle ??
            "Explore our portfolio of enterprise platforms, web applications, mobile solutions, and successful technology partnerships that deliver lasting business value. From custom software development and MVPs to dedicated engineering teams, we help businesses innovate faster, scale efficiently, and achieve measurable results through modern technology."}
        </p>
      </div>
    </section>
  );
}
