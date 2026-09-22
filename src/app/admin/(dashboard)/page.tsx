import Link from "next/link";
import { prisma } from "@/lib/prisma";

const CARDS = [
  { key: "services", label: "Services", href: "/admin/services" },
  { key: "portfolio", label: "Portfolio Items", href: "/admin/portfolio" },
  { key: "blog", label: "Blog Posts", href: "/admin/blog" },
  { key: "team", label: "Team Members", href: "/admin/team" },
  { key: "testimonials", label: "Testimonials", href: "/admin/testimonials" },
  { key: "clients", label: "Client Logos", href: "/admin/clients" },
  { key: "messages", label: "Unread Messages", href: "/admin/messages" },
] as const;

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  return (
    <div>
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-ink">Overview</h1>
        <p className="text-sm text-body">A snapshot of your site content.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="flex flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-6 transition-shadow hover:shadow-[0_10px_30px_rgba(6,186,181,0.08)]"
          >
            <p className="text-3xl font-semibold text-primary">{counts[card.key]}</p>
            <p className="text-sm text-body">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

async function getCounts() {
  try {
    const [services, portfolio, blog, team, testimonials, clients, messages] = await Promise.all([
      prisma.service.count(),
      prisma.portfolioItem.count(),
      prisma.blog.count(),
      prisma.teamMember.count(),
      prisma.testimonial.count(),
      prisma.clientLogo.count(),
      prisma.contactMessage.count({ where: { read: false } }),
    ]);
    return { services, portfolio, blog, team, testimonials, clients, messages };
  } catch {
    // DB not reachable yet (e.g. DATABASE_URL not configured) — show zeros
    // rather than crashing the dashboard.
    return { services: 0, portfolio: 0, blog: 0, team: 0, testimonials: 0, clients: 0, messages: 0 };
  }
}
