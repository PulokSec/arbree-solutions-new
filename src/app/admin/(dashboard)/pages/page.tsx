import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageContentEditor } from "@/components/admin/PageContentEditor";
import { getInternalLinkOptions } from "@/lib/admin-links";
import { PAGE_SCHEMAS, type PageKey } from "@/lib/page-schemas";
import { DEFAULT_ABOUT, DEFAULT_HOME, DEFAULT_SERVICES } from "@/lib/page-defaults";
import { savePageContent } from "./actions";

const DEFAULTS: Record<PageKey, Record<string, unknown>> = {
  home: DEFAULT_HOME,
  about: DEFAULT_ABOUT,
  services: DEFAULT_SERVICES,
};

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => !!v && typeof v === "object" && !Array.isArray(v);

/** Stored values win; arrays are replaced wholesale, objects merged key by key. */
function deepMerge(base: unknown, over: unknown): unknown {
  if (isObj(base) && isObj(over)) {
    const out: Obj = { ...base };
    for (const [k, v] of Object.entries(over)) out[k] = k in base ? deepMerge(base[k], v) : v;
    return out;
  }
  return over === undefined ? base : over;
}

export default async function AdminPagesContentPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page: PageKey = pageParam === "about" || pageParam === "services" ? pageParam : "home";
  const schema = PAGE_SCHEMAS[page];

  const [row, linkOptions] = await Promise.all([
    prisma.pageContent.findUnique({ where: { page } }).catch(() => null),
    getInternalLinkOptions(),
  ]);
  const initial = deepMerge(DEFAULTS[page], row?.content ?? {}) as Obj;

  return (
    <div className="mx-auto flex max-w-[860px] flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-ink">Page Content</h1>
        <p className="text-sm text-body">
          Edit the text and images on each page. Use the link button in any rich-text box to link to
          other pages on the site. Images are uploaded to the database. Fields you clear fall back to
          the built-in copy.
        </p>
      </div>

      <nav className="flex gap-2">
        {(Object.keys(PAGE_SCHEMAS) as PageKey[]).map((key) => (
          <Link
            key={key}
            href={`/admin/pages?page=${key}`}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              key === page ? "bg-primary text-white" : "bg-white text-ink hover:bg-primary-soft"
            }`}
          >
            {PAGE_SCHEMAS[key].title}
          </Link>
        ))}
      </nav>

      {page === "home" && (
        <p className="rounded-xl bg-primary-soft px-4 py-3 text-sm text-ink">
          Homepage stats, service cards, success stories, testimonials and client logos are managed
          from their own sections in the sidebar (Services, Portfolio, Testimonials, Client Logos).
        </p>
      )}

      <PageContentEditor
        key={page}
        fields={schema.fields}
        initial={initial as never}
        linkOptions={linkOptions}
        viewHref={schema.path}
        onSave={savePageContent.bind(null, page)}
      />
    </div>
  );
}
