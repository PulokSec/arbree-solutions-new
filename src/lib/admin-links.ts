import { prisma } from "@/lib/prisma";
import type { LinkOption } from "@/components/admin/RichTextEditor";

const STATIC_PAGES: LinkOption[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

/** Internal URLs offered in the rich-text link picker: static pages plus every published
 * blog post and portfolio case study. Falls back to static pages if the DB is unreachable. */
export async function getInternalLinkOptions(): Promise<LinkOption[]> {
  try {
    const [blogs, items] = await Promise.all([
      prisma.blog.findMany({ where: { published: true }, select: { title: true, slug: true }, orderBy: { createdAt: "desc" } }),
      prisma.portfolioItem.findMany({ where: { published: true }, select: { title: true, slug: true }, orderBy: { order: "asc" } }),
    ]);
    return [
      ...STATIC_PAGES,
      ...blogs.map((b) => ({ label: `Blog: ${b.title}`, href: `/blog/${b.slug}` })),
      ...items.map((p) => ({ label: `Portfolio: ${p.title}`, href: `/portfolio/${p.slug}` })),
    ];
  } catch {
    return STATIC_PAGES;
  }
}
