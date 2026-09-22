import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextAreaField, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export type TestimonialFormDefaults = {
  quote: string;
  authorName: string;
  authorTitle: string;
  authorAvatar?: string | null;
  rating: number;
};

export function TestimonialForm({
  title,
  action,
  defaults,
  submitLabel,
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  defaults?: TestimonialFormDefaults;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[680px]">
      <Link
        href="/admin/testimonials"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to Testimonials
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>

      <form
        action={action}
        className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6"
      >
        <TextAreaField label="Quote" name="quote" required rows={3} defaultValue={defaults?.quote} />
        <Field
          label="Author name"
          name="authorName"
          required
          defaultValue={defaults?.authorName}
        />
        <Field
          label="Author title"
          name="authorTitle"
          required
          placeholder="e.g. Project Manager, Warpspeed"
          defaultValue={defaults?.authorTitle}
        />
        <ImageUploadField
          label="Author avatar"
          name="authorAvatar"
          defaultValue={defaults?.authorAvatar}
        />
        <Field
          label="Rating (1–5)"
          name="rating"
          type="number"
          defaultValue={defaults ? String(defaults.rating) : "5"}
        />

        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
