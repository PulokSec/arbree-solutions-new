import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, TextAreaField, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export type TeamMemberFormDefaults = {
  name: string;
  role: string;
  bio?: string | null;
  photo?: string | null;
  linkedIn?: string | null;
};

export function TeamMemberForm({
  title,
  action,
  defaults,
  submitLabel,
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  defaults?: TeamMemberFormDefaults;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[680px]">
      <Link
        href="/admin/team"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to Team
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>

      <form action={action} className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        <Field label="Name" name="name" required defaultValue={defaults?.name} />
        <Field
          label="Role"
          name="role"
          required
          placeholder="e.g. Lead Engineer"
          defaultValue={defaults?.role}
        />
        <TextAreaField label="Bio" name="bio" rows={3} defaultValue={defaults?.bio ?? undefined} />
        <ImageUploadField label="Photo" name="photo" defaultValue={defaults?.photo} />
        <Field label="LinkedIn URL" name="linkedIn" defaultValue={defaults?.linkedIn ?? undefined} />

        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
