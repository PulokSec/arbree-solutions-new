export type CaseStudyMeta = {
  client: string;
  duration: string;
  teamSize: string;
};

export function CaseStudyHero({
  title,
  subtitle,
  meta,
  tags,
  image,
}: {
  title: string;
  subtitle: string;
  meta: CaseStudyMeta;
  tags: string[];
  image: string;
}) {
  return (
    <section className=" container mx-auto flex flex-col items-center gap-10 bg-white px-[30px] pb-10 pt-[140px] lg:flex-row lg:items-center lg:justify-between lg:px-[60px] lg:pb-[60px] lg:pt-[168px]">
      <div className="flex w-full max-w-[561px] flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-[40px] font-bold leading-[1.3] text-primary sm:text-[52px] lg:text-[64px]">
            {title}
          </h1>
          <p className="text-base leading-8 text-body">{subtitle}</p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-4 border-y border-ink/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-body">Client</p>
            <p className="text-base font-medium text-ink">{meta.client}</p>
          </div>
          <span className="h-px w-full bg-ink/10 sm:h-10 sm:w-px" aria-hidden />
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-body">Duration</p>
            <p className="text-base font-medium text-ink">{meta.duration}</p>
          </div>
          <span className="h-px w-full bg-ink/10 sm:h-10 sm:w-px" aria-hidden />
          <div className="flex flex-col items-start gap-2">
            <p className="text-sm text-body">Team Size</p>
            <p className="text-base font-medium text-ink">{meta.teamSize}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[44px] border border-primary/30 px-4 py-2 text-base text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="aspect-[699/456] w-full max-w-[699px] overflow-hidden rounded-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="size-full object-cover" />
      </div>
    </section>
  );
}
