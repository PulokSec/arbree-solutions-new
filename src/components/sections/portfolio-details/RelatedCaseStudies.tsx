import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PortfolioGridItem } from "@/components/sections/portfolio/PortfolioGrid";

function countryCodeToFlagEmoji(countryCode: string) {
  if (!/^[A-Za-z]{2}$/.test(countryCode)) return "🏳️";
  const codePoints = [...countryCode.toUpperCase()].map(
    (char) => 127397 + char.charCodeAt(0),
  );
  return String.fromCodePoint(...codePoints);
}

export function RelatedCaseStudies({ items }: { items: PortfolioGridItem[] }) {
  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start gap-10">
        <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
          Related Case Studies
        </h2>

        <div className="grid w-full grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-6 rounded-[20px] border border-ink/10 bg-white p-5"
            >
              <div className="aspect-[380/255] w-full overflow-hidden rounded-2xl bg-primary-soft">
                {item.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-xs text-primary/60">
                    No cover image yet
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col items-start gap-3">
                <div className="flex w-full items-start justify-between gap-2">
                  <p className="text-xl font-medium leading-tight text-ink">{item.title}</p>
                  <span className="text-lg leading-none" aria-hidden>
                    {countryCodeToFlagEmoji(item.countryCode)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/30 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-body">{item.summary}</p>
              </div>
              <Link
                href={`/portfolio/${item.slug}`}
                className="flex h-[52px] w-full items-center justify-center gap-1 rounded-[58px] bg-primary text-base font-medium text-white transition-opacity hover:opacity-90"
              >
                View Project
                <ArrowRight className="size-5" strokeWidth={1.75} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
