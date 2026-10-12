import { ICON_REGISTRY } from "@/lib/icon-registry";

/** Declarative description of each editable page, consumed by the admin PageContentEditor.
 * The shape mirrors the JSON stored in `PageContent.content` (see page-content.ts). */
export type FieldDef =
  | { type: "text" | "textarea" | "image" | "icon" | "link"; key: string; label: string; hint?: string }
  | { type: "richtext"; key: string; label: string; compact?: boolean; hint?: string }
  | { type: "group"; key: string; label: string; fields: FieldDef[] }
  | { type: "list"; key: string; label: string; itemLabel: string; fields: FieldDef[] }
  | { type: "richList"; key: string; label: string; itemLabel: string }
  | { type: "stringList"; key: string; label: string; itemLabel: string }
  | { type: "imageList"; key: string; label: string };

export const ICON_KEYS = Object.keys(ICON_REGISTRY);

const cta = (label = "Call to action"): FieldDef => ({
  type: "group",
  key: "cta",
  label,
  fields: [
    { type: "text", key: "title", label: "Heading" },
    { type: "textarea", key: "description", label: "Description" },
  ],
});

const iconItems = (key: string, label: string, itemLabel: string): FieldDef => ({
  type: "list",
  key,
  label,
  itemLabel,
  fields: [
    { type: "text", key: "title", label: "Title" },
    { type: "textarea", key: "description", label: "Description" },
    { type: "icon", key: "iconKey", label: "Icon" },
  ],
});

const statItems = (key: string, label: string): FieldDef => ({
  type: "list",
  key,
  label,
  itemLabel: "Stat",
  fields: [
    { type: "text", key: "value", label: "Value (e.g. 50+)" },
    { type: "text", key: "label", label: "Label" },
  ],
});

export type PageKey = "home" | "about" | "services";

export const PAGE_SCHEMAS: Record<PageKey, { title: string; path: string; fields: FieldDef[] }> = {
  home: {
    title: "Home",
    path: "/",
    fields: [
      {
        type: "group",
        key: "hero",
        label: "Hero",
        fields: [
          { type: "text", key: "badge", label: "Badge text" },
          { type: "text", key: "titleLine1", label: "Heading — first line" },
          { type: "text", key: "titleHighlight", label: "Heading — highlighted words (teal)" },
          { type: "richtext", key: "subtitle", label: "Paragraph", compact: true },
          { type: "text", key: "primaryLabel", label: "Primary button label" },
          { type: "link", key: "primaryHref", label: "Primary button link" },
          { type: "text", key: "secondaryLabel", label: "Secondary button label" },
          { type: "link", key: "secondaryHref", label: "Secondary button link" },
        ],
      },
      {
        type: "group",
        key: "intro",
        label: "Intro (“We are Arbree Solutions”)",
        fields: [
          { type: "text", key: "eyebrow", label: "Small heading" },
          { type: "text", key: "name", label: "Big heading (teal)" },
          { type: "text", key: "tagline", label: "Tagline" },
          { type: "richtext", key: "body", label: "Body", compact: true },
        ],
      },
      {
        type: "group",
        key: "services",
        label: "Services section",
        fields: [
          { type: "text", key: "eyebrow", label: "Small heading" },
          { type: "richtext", key: "intro", label: "Intro", compact: true },
        ],
      },
      {
        type: "group",
        key: "ourWork",
        label: "Success stories section",
        fields: [{ type: "richtext", key: "intro", label: "Intro", compact: true }],
      },
      {
        type: "group",
        key: "testimonial",
        label: "Testimonial section",
        fields: [{ type: "text", key: "heading", label: "Heading" }],
      },
      cta(),
    ],
  },
  about: {
    title: "About",
    path: "/about",
    fields: [
      {
        type: "group",
        key: "hero",
        label: "Hero",
        fields: [
          { type: "text", key: "title", label: "Heading (leave empty for the default styled heading)" },
          { type: "richtext", key: "subtitle", label: "Paragraph", compact: true },
          { type: "image", key: "image", label: "Hero image" },
        ],
      },
      {
        type: "group",
        key: "story",
        label: "Our Story",
        fields: [
          { type: "richList", key: "paragraphs", label: "Paragraphs", itemLabel: "Paragraph" },
          statItems("stats", "Stats"),
          { type: "image", key: "image", label: "Story image" },
        ],
      },
      {
        type: "group",
        key: "mission",
        label: "Our Mission",
        fields: [
          { type: "textarea", key: "intro", label: "Intro" },
          {
            type: "list",
            key: "rows",
            label: "Rows",
            itemLabel: "Row",
            fields: [
              { type: "text", key: "title", label: "Title" },
              { type: "textarea", key: "description", label: "Description" },
            ],
          },
        ],
      },
      {
        type: "group",
        key: "keyFeatures",
        label: "Key Features",
        fields: [{ type: "textarea", key: "intro", label: "Intro" }, iconItems("items", "Features", "Feature")],
      },
      {
        type: "group",
        key: "commitment",
        label: "Our Commitment",
        fields: [{ type: "textarea", key: "intro", label: "Intro" }, iconItems("items", "Values", "Value")],
      },
      cta(),
    ],
  },
  services: {
    title: "Services",
    path: "/services",
    fields: [
      {
        type: "group",
        key: "hero",
        label: "Hero",
        fields: [
          { type: "text", key: "title", label: "Heading" },
          { type: "richtext", key: "subtitle", label: "Paragraph", compact: true },
        ],
      },
      {
        type: "list",
        key: "serviceDetails",
        label: "Detailed services",
        itemLabel: "Service",
        fields: [
          { type: "text", key: "title", label: "Title" },
          { type: "richtext", key: "description", label: "Description", compact: true },
          { type: "image", key: "image", label: "Main image" },
          { type: "stringList", key: "benefits", label: "Benefits", itemLabel: "Benefit" },
          { type: "imageList", key: "gallery", label: "Gallery images" },
        ],
      },
      {
        type: "group",
        key: "teamAugmentation",
        label: "Team Augmentation",
        fields: [
          { type: "textarea", key: "intro", label: "Intro" },
          statItems("stats", "Stats"),
          {
            type: "list",
            key: "cards",
            label: "Cards",
            itemLabel: "Card",
            fields: [
              { type: "text", key: "title", label: "Title" },
              { type: "textarea", key: "description", label: "Description" },
            ],
          },
        ],
      },
      {
        type: "group",
        key: "process",
        label: "Our Process",
        fields: [{ type: "textarea", key: "intro", label: "Intro" }],
      },
      cta(),
    ],
  },
};
