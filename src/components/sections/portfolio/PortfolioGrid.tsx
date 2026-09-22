import Link from "next/link";
import { ArrowRight } from "lucide-react";

export type PortfolioGridItem = {
  id: string;
  slug: string;
  title: string;
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

export const FALLBACK_PORTFOLIO_GRID: PortfolioGridItem[] = [
  {
    id: "1",
    slug: "enterprise-crm-system",
    title: "Enterprise CRM System",
    countryCode: "BD",
    summary:
      "A comprehensive customer relationship management system built for large enterprises with advanced analytics and automation features.",
    coverImage: null,
    tags: ["Python", "Django", "PostgreSQL"],
  },
  {
    id: "2",
    slug: "inventory-management-tool",
    title: "Inventory Management Tool",
    countryCode: "BD",
    summary:
      "A comprehensive customer relationship management system built for large enterprises with advanced analytics and automation features.",
    coverImage: null,
    tags: ["Java", "Spring Boot", "MySQL"],
  },
  {
    id: "3",
    slug: "fitness-tracking-app",
    title: "Fitness Tracking App",
    countryCode: "BD",
    summary:
      "A comprehensive fitness app with workout plans, nutrition tracking, and social features to keep users motivated.",
    coverImage: null,
    tags: ["React Native", "Firebase", "Node.js"],
  },
  {
    id: "4",
    slug: "ecommerce-mobile-app",
    title: "E-commerce Mobile App",
    countryCode: "BD",
    summary:
      "Feature-rich shopping app with secure payments, real-time order tracking, and personalized recommendations.",
    coverImage: null,
    tags: ["Flutter", "Dart", "Stripe API"],
  },
  {
    id: "5",
    slug: "corporate-website",
    title: "Corporate Website",
    countryCode: "BD",
    summary:
      "Modern, responsive corporate website with content management system and integrated analytics dashboard.",
    coverImage: null,
    tags: ["React", "WordPress", "PHP"],
  },
  {
    id: "6",
    slug: "educational-platform",
    title: "Educational Platform",
    countryCode: "BD",
    summary:
      "Interactive learning platform with video courses, quizzes, and progress tracking for students and educators.",
    coverImage: null,
    tags: ["Vue.js", "Laravel", "MongoDB"],
  },
];

export function PortfolioGrid({ items = FALLBACK_PORTFOLIO_GRID }: { items?: PortfolioGridItem[] }) {
  return (
    <section className="bg-white px-[30px] py-10 lg:px-[60px] lg:py-5">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-8 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center gap-5 rounded-[20px] bg-white"
          >
            <div className="aspect-[604/345] w-full overflow-hidden rounded-[20px] bg-primary-soft">
              {item.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.coverImage} alt={item.title} className="size-full object-cover" />
              ) : (
                <div className="flex size-full items-center justify-center text-sm text-primary/60">
                  Add a cover image via the admin dashboard
                </div>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start gap-3">
                <div className="flex w-full items-start justify-between gap-3">
                  <p className="text-[28px] font-medium leading-[1.15] text-ink">{item.title}</p>
                  <span className="text-2xl leading-none" aria-hidden>
                    {countryCodeToFlagEmoji(item.countryCode)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-[10px]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[44px] border border-primary/30 px-4 py-2 text-base text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-base leading-8 text-body">{item.summary}</p>
              </div>

              <Link
                href={`/portfolio/${item.slug}`}
                className="flex h-[52px] w-full items-center justify-center gap-1 rounded-[58px] bg-primary text-base font-medium text-white transition-opacity hover:opacity-90"
              >
                View Project
                <ArrowRight className="size-6" strokeWidth={1.75} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
