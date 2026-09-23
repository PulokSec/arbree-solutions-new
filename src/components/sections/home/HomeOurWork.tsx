import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type PortfolioCardData = {
  id: string;
  title: string;
  slug: string;
  countryCode: string;
  summary: string;
  coverImage: string | null;
  tags: string[];
};

function countryCodeToFlagEmoji(countryCode: string) {
  if (!/^[A-Za-z]{2}$/.test(countryCode)) return "🏳️";
  const codePoints = [...countryCode.toUpperCase()].map(
    (char) => 127397 + char.charCodeAt(0),
  );
  return String.fromCodePoint(...codePoints);
}

const FALLBACK_PORTFOLIO: PortfolioCardData[] = [
  {
    id: "1",
    title: "Enterprise CRM System",
    slug: "enterprise-crm-system",
    countryCode: "BD",
    summary:
      "A comprehensive customer relationship management system built for large enterprises with advanced analytics and automation features.",
    coverImage: null,
    tags: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: "2",
    title: "Inventory Management Tool",
    slug: "inventory-management-tool",
    countryCode: "CA",
    summary:
      "A comprehensive customer relationship management system built for large enterprises with advanced analytics and automation features.",
    coverImage: null,
    tags: ["Java", "Spring Boot", "MySQL"],
  },
  {
    id: "3",
    title: "Fitness Tracking App",
    slug: "fitness-tracking-app",
    countryCode: "US",
    summary:
      "A comprehensive customer relationship management system built for large enterprises with advanced analytics and automation features.",
    coverImage: null,
    tags: ["React Native", "Firebase", "Node.js"],
  },
];

export function HomeOurWork({ items = FALLBACK_PORTFOLIO }: { items?: PortfolioCardData[] }) {
  return (
    <section id="our-work" className="bg-[#f8f8f8] px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-[60px]">
        <Reveal className="flex w-full flex-col items-start justify-between gap-8 lg:flex-row">
          <h2 className="text-[40px] font-semibold leading-none text-ink sm:text-[48px]">
            Partnership
            <br />
            <span className="text-primary">Success</span> Stories
          </h2>
          <div className="flex w-full max-w-[644px] flex-col items-start gap-8 lg:items-end">
            <p className="text-lg leading-8 text-body lg:text-right">
              Great solutions begin with great partnerships. Discover how our collaborative
              approach has helped businesses overcome challenges and achieve breakthrough
              results
            </p>
            <Link
              href="/portfolio"
              className="flex h-[52px] items-center justify-center gap-1 rounded-[58px] bg-primary px-6 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              See All
            </Link>
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 100}>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({ item }: { item: PortfolioCardData }) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-10 rounded-[20px] border border-ink/10 bg-white p-5 shadow-[34.854px_29.626px_48.34px_rgba(6,186,181,0.05)] transition-transform duration-300 hover:-translate-y-2">
      <div className="aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-primary-soft">
        {item.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.coverImage} alt={item.title} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-primary/60">
            Add a cover image via the admin dashboard
          </div>
        )}
      </div>

      <div className="flex w-full flex-1 flex-col items-center gap-6">
        <div className="flex w-full flex-1 flex-col items-start gap-3">
          <div className="flex w-full items-start justify-between gap-3">
            <p className="line-clamp-1 text-[28px] font-medium leading-[32px] text-ink">
              {item.title}
            </p>
            <span className="shrink-0 text-2xl leading-none" aria-hidden>
              {countryCodeToFlagEmoji(item.countryCode)}
            </span>
          </div>
          <div className="flex min-h-[42px] flex-wrap items-center gap-[10px]">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-[44px] border border-primary/30 px-4 py-2 text-base text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="line-clamp-2 text-base leading-8 text-body">{item.summary}</p>
        </div>

        <Link
          href={`/portfolio/${item.slug}`}
          className="mt-auto flex h-[52px] w-full items-center justify-center gap-1 rounded-[58px] bg-primary text-base font-medium text-white transition-opacity hover:opacity-90"
        >
          View Project
          <ArrowRight className="size-6" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
