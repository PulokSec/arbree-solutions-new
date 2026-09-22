import { Field, TextAreaField } from "@/components/admin/AdminForm";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export type SeoFieldDefaults = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
};

/** Drop this inside any admin <form> to add the standard SEO field set.
 * Field `name`s match what each entity's server action expects to read
 * from FormData (metaTitle, metaDescription, ...). */
export function SeoFieldsSection({ defaults }: { defaults?: SeoFieldDefaults }) {
  return (
    <details className="group rounded-xl border border-[#d5d7da]">
      <summary className="cursor-pointer select-none rounded-xl px-4 py-3 text-sm font-medium text-ink">
        SEO &amp; Social Sharing
      </summary>
      <div className="flex flex-col gap-5 border-t border-[#d5d7da] p-4">
        <p className="text-xs text-body">
          Leave any field blank to fall back to the page&apos;s title/description/image.
        </p>
        <Field
          label="Meta title"
          name="metaTitle"
          placeholder="Overrides the browser tab / search result title"
          defaultValue={defaults?.metaTitle ?? undefined}
        />
        <TextAreaField
          label="Meta description"
          name="metaDescription"
          rows={2}
          placeholder="Shown under the title in search results"
          defaultValue={defaults?.metaDescription ?? undefined}
        />
        <Field
          label="Meta keywords"
          name="metaKeywords"
          placeholder="Comma-separated"
          defaultValue={defaults?.metaKeywords ?? undefined}
        />
        <Field
          label="OG title"
          name="ogTitle"
          placeholder="Facebook/LinkedIn share title (falls back to meta title)"
          defaultValue={defaults?.ogTitle ?? undefined}
        />
        <TextAreaField
          label="OG description"
          name="ogDescription"
          rows={2}
          defaultValue={defaults?.ogDescription ?? undefined}
        />
        <ImageUploadField
          label="OG image"
          name="ogImage"
          hint="1200x630 recommended"
          defaultValue={defaults?.ogImage}
        />
        <Field
          label="Twitter title"
          name="twitterTitle"
          placeholder="Falls back to OG title"
          defaultValue={defaults?.twitterTitle ?? undefined}
        />
        <TextAreaField
          label="Twitter description"
          name="twitterDescription"
          rows={2}
          defaultValue={defaults?.twitterDescription ?? undefined}
        />
        <ImageUploadField
          label="Twitter image"
          name="twitterImage"
          hint="Falls back to OG image"
          defaultValue={defaults?.twitterImage}
        />
      </div>
    </details>
  );
}

/** Reads the 9 standard SEO fields off a FormData into the shape every
 * entity's Prisma `data` object expects. Empty/missing fields become
 * `null` (not `undefined`) so an update that clears a field actually
 * clears it in the DB rather than leaving the old value untouched. */
export function readSeoFields(formData: FormData) {
  const get = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" && value.trim() !== "" ? value : null;
  };
  return {
    metaTitle: get("metaTitle"),
    metaDescription: get("metaDescription"),
    metaKeywords: get("metaKeywords"),
    ogTitle: get("ogTitle"),
    ogDescription: get("ogDescription"),
    ogImage: get("ogImage"),
    twitterTitle: get("twitterTitle"),
    twitterDescription: get("twitterDescription"),
    twitterImage: get("twitterImage"),
  };
}
