import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Field, SubmitButton } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export type ClientLogoFormDefaults = {
  name: string;
  logo: string;
  url?: string | null;
};

export function ClientLogoForm({
  title,
  action,
  defaults,
  submitLabel,
}: {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  defaults?: ClientLogoFormDefaults;
  submitLabel: string;
}) {
  return (
    <div className="mx-auto max-w-[680px]">
      <Link
        href="/admin/clients"
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        <ArrowLeft className="size-4" /> Back to Client Logos
      </Link>

      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>

      <form
        action={action}
        className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6"
      >
        <Field label="Client name" name="name" required defaultValue={defaults?.name} />
        <ImageUploadField label="Logo image" name="logo" required defaultValue={defaults?.logo} />
        <Field label="Client website URL" name="url" defaultValue={defaults?.url ?? undefined} />

        <SubmitButton label={submitLabel} />
      </form>
    </div>
  );
}
