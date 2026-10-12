/**
 * Minimal allow-list sanitizer for admin-authored rich text. The editor only emits a small tag
 * set, so anything outside it (scripts, iframes, event handlers, javascript: URLs, …) is dropped.
 * Content is admin-only, so this is defence in depth rather than a full untrusted-HTML filter.
 */
const ALLOWED_TAGS = new Set([
  "p", "br", "h1", "strong", "b", "em", "i", "u", "s", "a", "ul", "ol", "li", "h2", "h3", "h4",
  "blockquote", "hr", "img", "code", "pre", "span", "div",
]);
const ALLOWED_ATTRS = new Set(["href", "target", "rel", "src", "alt", "title", "style", "loading"]);

// Only text-align and font-size (px/rem/em/%) declarations survive — nothing else is needed.
const SAFE_STYLE =
  /^\s*(?:(?:text-align:\s*(?:left|center|right|justify)|font-size:\s*\d+(?:\.\d+)?(?:px|rem|em|%))\s*;?\s*)+$/i;

function safeUrl(value: string) {
  return !/^\s*(javascript|data|vbscript):/i.test(value);
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<\/?([a-zA-Z0-9]+)((?:\s+[^<>]*?)?)\s*(\/?)>/g, (match, tag: string, attrs: string) => {
      const name = tag.toLowerCase();
      if (!ALLOWED_TAGS.has(name)) return "";
      if (match.startsWith("</")) return `</${name}>`;
      const kept: string[] = [];
      for (const m of attrs.matchAll(/([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
        const attr = m[1].toLowerCase();
        const value = m[3] ?? m[4] ?? "";
        if (!ALLOWED_ATTRS.has(attr)) continue;
        if ((attr === "href" || attr === "src") && !safeUrl(value)) continue;
        if (attr === "style" && !SAFE_STYLE.test(value)) continue;
        kept.push(`${attr}="${value.replace(/"/g, "&quot;")}"`);
      }
      const selfClose = ["br", "hr", "img"].includes(name) ? " /" : "";
      return `<${name}${kept.length ? " " + kept.join(" ") : ""}${selfClose}>`;
    });
}

/** True when a stored string is HTML from the editor rather than legacy plain text. */
export function looksLikeHtml(value: string) {
  return /<[a-z][\s\S]*>/i.test(value);
}
