import { looksLikeHtml, sanitizeHtml } from "@/lib/sanitize-html";

/** Renders editor-authored HTML (or legacy plain text) with the site's rich-text styles. */
export function RichText({
  html,
  className = "",
}: {
  html: string;
  className?: string;
}) {
  if (!looksLikeHtml(html)) {
    return <div className={`rich-content ${className}`}>{html}</div>;
  }
  return (
    <div
      className={`rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(html) }}
    />
  );
}
