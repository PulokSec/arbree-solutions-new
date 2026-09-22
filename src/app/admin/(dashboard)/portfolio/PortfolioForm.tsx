import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextAreaField, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField, ImageGalleryField } from "@/components/admin/ImageUploadField";
import { SeoFieldsSection, type SeoFieldDefaults } from "@/components/admin/SeoFieldsSection";

export type PortfolioFormDefaults = SeoFieldDefaults & {
  title: string;
  slug: string;
  countryCode: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  clientName?: string | null;
  duration?: string | null;
  teamSize?: string | null;
  tags?: string; // comma-joined
  overview?: string | null;
  caseStudyDetailJson?: string;
};

export function PortfolioForm({
  title,
  action,
  defaults,
  submitLabel,
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  defaults?: PortfolioFormDefaults;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[680px]">
      <Link
        href="/admin/portfolio"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to Portfolio
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>

      <form action={action} className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <Field label="Title" name="title" required defaultValue={defaults?.title} />
        <Field
          label="Slug"
          name="slug"
          required
          placeholder="e.g. enterprise-crm-system"
          defaultValue={defaults?.slug}
        />
        <Field
          label="Country code"
          name="countryCode"
          required
          placeholder="Two-letter ISO code, e.g. BD"
          defaultValue={defaults?.countryCode}
        />
        <Field
          label="Summary"
          name="summary"
          required
          placeholder="Shown on card previews"
          defaultValue={defaults?.summary}
        />
        <TextAreaField
          label="Description"
          name="description"
          required
          defaultValue={defaults?.description}
        />
        <ImageUploadField
          label="Cover image"
          name="coverImage"
          required
          defaultValue={defaults?.coverImage}
        />
        <ImageGalleryField
          label="Gallery"
          name="gallery"
          hint="Shown as the project gallery on the case study page"
          defaultValue={defaults?.gallery}
        />
        <Field label="Client name" name="clientName" defaultValue={defaults?.clientName ?? undefined} />
        <Field
          label="Duration"
          name="duration"
          placeholder="e.g. 8 Months"
          defaultValue={defaults?.duration ?? undefined}
        />
        <Field
          label="Team size"
          name="teamSize"
          placeholder="e.g. 12 Person"
          defaultValue={defaults?.teamSize ?? undefined}
        />
        <Field
          label="Tags"
          name="tags"
          placeholder="Comma-separated, e.g. React, Node.js"
          defaultValue={defaults?.tags}
        />
        <TextAreaField
          label="Project Overview (long-form copy for the details page)"
          name="overview"
          rows={6}
          defaultValue={defaults?.overview ?? undefined}
        />
        <TextAreaField
          label="Case Study JSON (advanced — stats, key features, tech highlights, process steps)"
          name="caseStudyDetailJson"
          rows={8}
          mono
          defaultValue={defaults?.caseStudyDetailJson}
          placeholder={`{\n  "stats": [{ "label": "Users Supported", "value": "50,000+" }],\n  "keyFeatures": [{ "title": "Advanced Analytics", "description": "...", "iconKey": "bar-chart-3" }],\n  "techStackIntro": "...",\n  "techHighlights": [{ "title": "Clean Architecture", "description": "...", "iconKey": "code-2" }],\n  "solutionSummary": "...",\n  "process": [{ "title": "Step title", "description": "..." }]\n}`}
        />

        <SeoFieldsSection defaults={defaults} />

        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
