import { prisma } from "@/lib/prisma";
import { Field, TextAreaField, SubmitButton } from "@/components/admin/AdminForm";
import { saveAnalyticsSettings } from "./actions";

export default async function AdminAnalyticsPage() {
  const settings = await getAnalyticsSettings();

  return (
    <div className="mx-auto max-w-[680px]">
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-ink">Analytics</h1>
        <p className="text-sm text-body">
          Google Analytics and Google Tag Manager are injected site-wide once configured here —
          no code changes needed. Custom snippets are for anything else (Meta Pixel, Hotjar,
          etc.) and are inserted as raw HTML, so paste the full <code className="rounded bg-[#f8f8f8] px-1">&lt;script&gt;</code> tag.
        </p>
      </div>

      <form
        action={saveAnalyticsSettings}
        className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6"
      >
        <Field
          label="Google Analytics Measurement ID"
          name="gaMeasurementId"
          placeholder="G-XXXXXXXXXX"
          defaultValue={settings?.gaMeasurementId ?? undefined}
        />
        <Field
          label="Google Tag Manager Container ID"
          name="gtmContainerId"
          placeholder="GTM-XXXXXXX"
          defaultValue={settings?.gtmContainerId ?? undefined}
        />
        <TextAreaField
          label="Custom <head> snippet"
          name="customHeadSnippet"
          rows={6}
          mono
          placeholder="<script>...</script> or <meta ... />"
          defaultValue={settings?.customHeadSnippet ?? undefined}
        />
        <TextAreaField
          label="Custom <body> snippet"
          name="customBodySnippet"
          rows={6}
          mono
          placeholder="Inserted right after <body> opens"
          defaultValue={settings?.customBodySnippet ?? undefined}
        />

        <SubmitButton label="Save Analytics Settings" />
      </form>
    </div>
  );
}

async function getAnalyticsSettings() {
  try {
    return await prisma.analyticsSettings.findUnique({ where: { id: "singleton" } });
  } catch {
    return null;
  }
}
