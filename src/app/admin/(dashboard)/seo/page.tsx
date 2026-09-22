import Link from "next/link";
import { Pencil } from "lucide-react";
import { AdminPageHeader, AdminTable } from "@/components/admin/AdminTable";
import { prisma } from "@/lib/prisma";

const PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "about", label: "About Us", path: "/about" },
  { key: "services", label: "Services", path: "/services" },
  { key: "portfolio", label: "Portfolio", path: "/portfolio" },
  { key: "blog", label: "Blog", path: "/blog" },
  { key: "contact", label: "Contact", path: "/contact" },
];

export default async function AdminSeoPage() {
  const rows = await getSeoRows();

  return (
    <div>
      <AdminPageHeader
        title="SEO"
        description="Meta title, description, keywords, OG/Twitter cards, and featured image per page. Individual Blog posts and Portfolio items carry their own SEO fields on their own edit forms."
      />

      <AdminTable columns={["Page", "Meta title", "Status", ""]}>
        {PAGES.map((page) => {
          const row = rows.get(page.key);
          return (
            <tr key={page.key}>
              <td className="px-5 py-4 font-medium text-ink">
                {page.label}
                <span className="ml-2 text-xs text-body">{page.path}</span>
              </td>
              <td className="px-5 py-4 text-body">{row?.metaTitle || "—"}</td>
              <td className="px-5 py-4 text-body">
                {row ? (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Customized
                  </span>
                ) : (
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-body">
                    Using defaults
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-right">
                <Link
                  href={`/admin/seo/${page.key}`}
                  className="inline-flex size-8 items-center justify-center rounded-lg text-body transition-colors hover:bg-primary-soft hover:text-primary"
                  aria-label="Edit"
                >
                  <Pencil className="size-4" strokeWidth={1.75} />
                </Link>
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </div>
  );
}

async function getSeoRows() {
  try {
    const rows = await prisma.seoSettings.findMany();
    return new Map(rows.map((r: { page: string }) => [r.page, r]));
  } catch {
    return new Map();
  }
}
