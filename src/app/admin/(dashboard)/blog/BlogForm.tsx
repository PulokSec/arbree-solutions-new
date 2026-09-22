import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextAreaField, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SeoFieldsSection, type SeoFieldDefaults } from "@/components/admin/SeoFieldsSection";

export type BlogFormDefaults = SeoFieldDefaults & {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string | null;
  author?: string | null;
  tags?: string; // comma-joined
  published: boolean;
  publishedAt?: string; // yyyy-mm-dd
};

export function BlogForm({
  title,
  action,
  defaults,
  submitLabel,
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  defaults?: BlogFormDefaults;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[760px]">
      <Link
        href="/admin/blog"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to Blog
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>

      <form action={action} className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <Field label="Title" name="title" required defaultValue={defaults?.title} />
        <Field
          label="Slug"
          name="slug"
          required
          placeholder="e.g. how-we-scaled-our-backend"
          defaultValue={defaults?.slug}
        />
        <TextAreaField
          label="Excerpt (shown on the blog listing card)"
          name="excerpt"
          required
          rows={2}
          defaultValue={defaults?.excerpt}
        />
        <TextAreaField
          label="Content (HTML — headings, paragraphs, links, images all accepted)"
          name="content"
          required
          rows={16}
          mono
          defaultValue={defaults?.content}
        />
        <ImageUploadField
          label="Featured image"
          name="featuredImage"
          defaultValue={defaults?.featuredImage}
        />
        <Field label="Author" name="author" defaultValue={defaults?.author ?? undefined} />
        <Field
          label="Tags"
          name="tags"
          placeholder="Comma-separated, e.g. Engineering, Product"
          defaultValue={defaults?.tags}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={defaults?.published ?? false}
            className="size-4 rounded border-[#d5d7da] text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-ink">
            Published
          </label>
        </div>
        <Field
          label="Publish date (optional — defaults to now if published with no date set)"
          name="publishedAt"
          type="date"
          defaultValue={defaults?.publishedAt}
        />

        <SeoFieldsSection defaults={defaults} />

        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
