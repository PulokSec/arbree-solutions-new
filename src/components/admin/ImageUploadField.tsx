"use client";

import { useState } from "react";
import { ImageIcon, Loader2, X } from "lucide-react";

async function uploadFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.error ?? "Upload failed");
  }
  return body.url as string;
}

/** A single-image upload field. Uploads immediately on file select (stored as
 * bytes in Postgres via /api/admin/upload) and keeps the resulting `/api/media/<id>`
 * URL in a hidden input, so it drops into any existing `<form action={serverAction}>`
 * exactly like the plain-text `Field` it replaces — no server action changes needed. */
export function ImageUploadField({
  label,
  name,
  defaultValue,
  required,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  hint?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      setUrl(await uploadFile(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {/* type="hidden" inputs are excluded from HTML5 constraint validation, so `required`
          here is documentation only — the server action's zod schema is the real gate. */}
      <input type="hidden" name={name} value={url} />
      <div className="flex items-center gap-4">
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            alt=""
            className="size-20 shrink-0 rounded-xl border border-[#d5d7da] object-cover"
          />
        ) : (
          <div className="flex size-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-[#d5d7da] text-body/60">
            <ImageIcon className="size-6" strokeWidth={1.5} />
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#d5d7da] px-4 py-2 text-sm font-medium text-ink hover:border-primary">
            {uploading && <Loader2 className="size-4 animate-spin" />}
            {uploading ? "Uploading…" : url ? "Replace image" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={handleFile}
            />
          </label>
          {url && !uploading && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="flex items-center gap-1 text-sm text-body hover:text-red-600"
            >
              <X className="size-3.5" /> Remove
            </button>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
          {hint && !error && <p className="text-xs text-body">{hint}</p>}
        </div>
      </div>
    </div>
  );
}

/** A multi-image upload field for `String[]` gallery columns. Renders every
 * current image with a remove button plus an "add image" upload control, and
 * serializes back to the form as one hidden input per URL under the same
 * `name` — read server-side with `formData.getAll(name)`. */
export function ImageGalleryField({
  label,
  name,
  defaultValue,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string[];
  hint?: string;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file);
      setUrls((prev) => [...prev, url]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      {urls.map((url) => (
        <input key={url} type="hidden" name={name} value={url} />
      ))}
      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <div key={url} className="group relative size-20 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="size-20 rounded-xl border border-[#d5d7da] object-cover"
            />
            <button
              type="button"
              onClick={() => setUrls((prev) => prev.filter((_, idx) => idx !== i))}
              className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-ink text-white opacity-0 transition-opacity group-hover:opacity-100"
              aria-label="Remove image"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
        <label className="flex size-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-[#d5d7da] text-body/60 hover:border-primary hover:text-primary">
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <ImageIcon className="size-5" strokeWidth={1.5} />}
          <span className="text-[11px]">{uploading ? "Uploading…" : "Add image"}</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {hint && !error && <p className="text-xs text-body">{hint}</p>}
    </div>
  );
}
