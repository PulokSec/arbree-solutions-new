import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Field, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SeoFieldsSection } from "@/components/admin/SeoFieldsSection";
import { saveSeoSettings } from "../actions";

const PAGE_LABELS: Record<string, string> = {
  home: "Home",
  about: "About Us",
  services: "Services",
  portfolio: "Portfolio",
  blog: "Blog",
  contact: "Contact",
};

export default async function EditSeoSettingsPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const label = PAGE_LABELS[page];
  if (!label) notFound();

  const settings = await getSeoSettings(page);

  return (
    <div className="mx-auto max-w-[680px]">
      <Link
        href="/admin/seo"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to SEO
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{label} — SEO</h1>

      <form
        action={saveSeoSettings.bind(null, page)}
        className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6"
      >
        <Field
          label="On-page heading override (H1)"
          name="heading"
          placeholder="Leave blank to keep the page's normal heading"
          defaultValue={settings?.heading ?? undefined}
        />
        <ImageUploadField
          label="Featured image"
          name="featuredImage"
          hint="Used as a fallback OG/Twitter image if those aren't set below"
          defaultValue={settings?.featuredImage}
        />

        <SeoFieldsSection defaults={settings ?? undefined} />

        <SubmitButton label="Save SEO Settings" />
      </form>
    </div>
  );
}

async function getSeoSettings(page: string) {
  try {
    return await prisma.seoSettings.findUnique({ where: { page } });
  } catch {
    return null;
  }
}
