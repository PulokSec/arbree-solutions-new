import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextAreaField, SelectField, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { SeoFieldsSection, type SeoFieldDefaults } from "@/components/admin/SeoFieldsSection";

export type ServiceFormDefaults = SeoFieldDefaults & {
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  iconKey: string;
  coverImage?: string | null;
  tags?: string; // comma-joined
};

export function ServiceForm({
  title,
  action,
  defaults,
  submitLabel,
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  defaults?: ServiceFormDefaults;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[680px]">
      <Link
        href="/admin/services"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to Services
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>

      <form action={action} className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <Field label="Title" name="title" required defaultValue={defaults?.title} />
        <Field
          label="Slug"
          name="slug"
          required
          placeholder="e.g. web-development"
          defaultValue={defaults?.slug}
        />
        <SelectField
          label="Category"
          name="category"
          required
          options={[
            { value: "TECH_SOLUTION", label: "Tech Solution" },
            { value: "TEAM_AUGMENTATION", label: "Team Augmentation" },
          ]}
          defaultValue={defaults?.category}
        />
        <Field label="Summary" name="summary" required defaultValue={defaults?.summary} />
        <TextAreaField
          label="Description"
          name="description"
          required
          defaultValue={defaults?.description}
        />
        <Field
          label="Icon key"
          name="iconKey"
          required
          placeholder="e.g. code-2 (maps to a lucide icon on the frontend)"
          defaultValue={defaults?.iconKey}
        />
        <ImageUploadField label="Cover image" name="coverImage" defaultValue={defaults?.coverImage} />
        <Field
          label="Tags"
          name="tags"
          placeholder="Comma-separated, e.g. React, Next.js, Node"
          defaultValue={defaults?.tags}
        />

        <SeoFieldsSection defaults={defaults} />

        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
