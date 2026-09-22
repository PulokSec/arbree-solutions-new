import { prisma } from "@/lib/prisma";
import { TextAreaField, SubmitButton } from "@/components/admin/AdminForm";
import { savePageContent } from "./actions";

const ABOUT_TEMPLATE = `{
  "hero": { "title": "", "subtitle": "" },
  "story": {
    "paragraphs": ["", ""],
    "stats": [{ "value": "50+", "label": "Projects Completed" }]
  },
  "mission": {
    "intro": "",
    "rows": [{ "title": "", "description": "" }]
  },
  "keyFeatures": {
    "intro": "",
    "items": [{ "title": "", "description": "", "iconKey": "shield-check" }]
  },
  "commitment": {
    "intro": "",
    "items": [{ "title": "", "description": "", "iconKey": "award" }]
  },
  "cta": { "title": "", "description": "" }
}`;

const SERVICES_TEMPLATE = `{
  "hero": { "title": "", "subtitle": "" },
  "overview": {
    "intro": "",
    "items": [{ "title": "", "description": "", "iconKey": "code-2" }]
  },
  "serviceDetails": [
    {
      "title": "UI/UX Design",
      "description": "",
      "image": "https://...",
      "benefits": ["User-centered design approach"],
      "gallery": ["https://..."]
    }
  ],
  "teamAugmentation": {
    "intro": "",
    "stats": [{ "value": "72h", "label": "Deployment Time" }],
    "cards": [{ "title": "", "description": "" }]
  },
  "process": {
    "intro": "",
    "steps": [{ "title": "", "description": "", "iconKey": "lightbulb" }]
  },
  "cta": { "title": "", "description": "" }
}`;

export default async function AdminPagesContentPage() {
  const [aboutRow, servicesRow] = await getPageContent();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-ink">Page Content</h1>
        <p className="text-sm text-body">
          Freeform JSON content for the About and Services pages. Leave any key out to keep
          that section&apos;s built-in default. Icon keys map to a fixed set of icons on the
          frontend — see <code className="rounded bg-[#f8f8f8] px-1">src/lib/icon-registry.ts</code>.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink">About Page</h2>
        <form
          action={savePageContent.bind(null, "about")}
          className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6"
        >
          <TextAreaField
            label="Content JSON"
            name="contentJson"
            rows={16}
            mono
            defaultValue={
              aboutRow ? JSON.stringify(aboutRow.content, null, 2) : ABOUT_TEMPLATE
            }
          />
          <SubmitButton label="Save About Page Content" />
        </form>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-ink">Services Page</h2>
        <form
          action={savePageContent.bind(null, "services")}
          className="flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white p-6"
        >
          <TextAreaField
            label="Content JSON"
            name="contentJson"
            rows={16}
            mono
            defaultValue={
              servicesRow ? JSON.stringify(servicesRow.content, null, 2) : SERVICES_TEMPLATE
            }
          />
          <SubmitButton label="Save Services Page Content" />
        </form>
      </section>
    </div>
  );
}

async function getPageContent() {
  try {
    const [about, services] = await Promise.all([
      prisma.pageContent.findUnique({ where: { page: "about" } }),
      prisma.pageContent.findUnique({ where: { page: "services" } }),
    ]);
    return [about, services] as const;
  } catch {
    return [null, null] as const;
  }
}
