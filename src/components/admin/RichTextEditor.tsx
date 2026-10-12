"use client";

import { useId, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ImageIcon,
  Italic,
  Link2,
  Link2Off,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";

export type LinkOption = { label: string; href: string };

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
  const body = await res.json().catch(() => null);
  if (!res.ok) throw new Error(body?.error ?? "Upload failed");
  return body.url as string;
}

const BLOCKS = [
  { value: "paragraph", label: "Paragraph (p)" },
  { value: "1", label: "Heading 1 (h1)" },
  { value: "2", label: "Heading 2 (h2)" },
  { value: "3", label: "Heading 3 (h3)" },
  { value: "4", label: "Heading 4 (h4)" },
] as const;

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px", "48px", "56px", "64px"];

const selectClass =
  "h-8 rounded-lg border border-[#d5d7da] bg-white px-2 text-sm text-ink outline-none hover:border-primary focus:border-primary";

function ToolbarButton({
  label,
  active,
  disabled,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      // keep the editor selection when clicking toolbar buttons
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex size-8 items-center justify-center rounded-lg text-ink transition-colors disabled:opacity-40 ${
        active ? "bg-primary-soft text-primary" : "hover:bg-[#f0f0f0]"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <span className="mx-1 h-5 w-px bg-[#d5d7da]" />;
}

function LinkDialog({
  editor,
  options,
  onClose,
}: {
  editor: Editor;
  options: LinkOption[];
  onClose: () => void;
}) {
  const [href, setHref] = useState<string>(editor.getAttributes("link").href ?? "");
  const [newTab, setNewTab] = useState<boolean>(editor.getAttributes("link").target === "_blank");
  const listId = useId();

  function apply() {
    const value = href.trim();
    if (!value) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      // Internal paths stay same-tab; external URLs default to a new tab when ticked.
      const attrs = newTab
        ? { href: value, target: "_blank", rel: "noopener noreferrer" }
        : { href: value, target: null, rel: null };
      editor.chain().focus().extendMarkRange("link").setLink(attrs).run();
    }
    onClose();
  }

  return (
    <div className="absolute left-3 right-3 top-[52px] z-20 flex flex-col gap-3 rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
      <label className="text-sm font-medium text-ink">
        Link — type a URL or choose a page on this site
      </label>
      <input
        autoFocus
        list={listId}
        value={href}
        onChange={(e) => setHref(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            apply();
          }
        }}
        placeholder="/services  or  https://example.com"
        className="rounded-xl border border-[#d5d7da] px-4 py-2.5 text-base text-ink outline-none focus:border-primary"
      />
      <datalist id={listId}>
        {options.map((o) => (
          <option key={o.href} value={o.href}>
            {o.label}
          </option>
        ))}
      </datalist>
      {options.length > 0 && (
        <div className="flex max-h-32 flex-wrap gap-1.5 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o.href}
              type="button"
              onClick={() => setHref(o.href)}
              className={`rounded-full border px-3 py-1 text-xs ${
                href === o.href
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-[#d5d7da] text-body hover:border-primary"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={newTab}
          onChange={(e) => setNewTab(e.target.checked)}
          className="size-4 rounded border-[#d5d7da] text-primary"
        />
        Open in a new tab
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#d5d7da] px-4 py-1.5 text-sm text-ink hover:border-primary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={apply}
          className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          {href.trim() ? "Apply link" : "Remove link"}
        </button>
      </div>
    </div>
  );
}

function Toolbar({
  editor,
  linkOptions,
  compact,
}: {
  editor: Editor;
  linkOptions: LinkOption[];
  compact: boolean;
}) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Re-render the toolbar when the selection / marks change so active states stay accurate.
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      block: e.isActive("heading")
        ? String(e.getAttributes("heading").level)
        : "paragraph",
      fontSize: (e.getAttributes("textStyle").fontSize as string | undefined) ?? "",
      bullet: e.isActive("bulletList"),
      ordered: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      left: e.isActive({ textAlign: "left" }),
      center: e.isActive({ textAlign: "center" }),
      right: e.isActive({ textAlign: "right" }),
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  });

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const src = await uploadImage(file);
      editor.chain().focus().setImage({ src, alt: file.name.replace(/\.[^.]+$/, "") }).run();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative border-b border-[#d5d7da] bg-[#fafafa] px-2 py-1.5">
      <div className="flex flex-wrap items-center gap-0.5">
        <ToolbarButton label="Bold" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Underline" active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Strikethrough" active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <Divider />
        <select
          aria-label="Text style"
          title="Paragraph / heading"
          className={selectClass}
          value={state.block}
          onChange={(e) => {
            const v = e.target.value;
            const chain = editor.chain().focus();
            if (v === "paragraph") chain.setParagraph().run();
            else chain.setHeading({ level: Number(v) as 1 | 2 | 3 | 4 }).run();
          }}
        >
          {BLOCKS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Font size"
          title="Font size"
          className={`${selectClass} ml-1`}
          value={state.fontSize}
          onChange={(e) => {
            const v = e.target.value;
            const chain = editor.chain().focus();
            if (v) chain.setFontSize(v).run();
            else chain.unsetFontSize().run();
          }}
        >
          <option value="">{state.block === "paragraph" ? "Size: default" : "Size: heading default"}</option>
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
          {state.fontSize && !FONT_SIZES.includes(state.fontSize) && (
            <option value={state.fontSize}>{state.fontSize}</option>
          )}
        </select>
        <Divider />
        <ToolbarButton label="Bulleted list" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="size-4" />
        </ToolbarButton>
        {!compact && (
          <>
            <ToolbarButton label="Quote" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <Quote className="size-4" />
            </ToolbarButton>
            <ToolbarButton label="Divider line" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
              <Minus className="size-4" />
            </ToolbarButton>
            <Divider />
            <ToolbarButton label="Align left" active={state.left} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
              <AlignLeft className="size-4" />
            </ToolbarButton>
            <ToolbarButton label="Align center" active={state.center} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
              <AlignCenter className="size-4" />
            </ToolbarButton>
            <ToolbarButton label="Align right" active={state.right} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
              <AlignRight className="size-4" />
            </ToolbarButton>
            <Divider />
          </>
        )}
        <ToolbarButton label="Insert / edit link" active={state.link} onClick={() => setLinkOpen((v) => !v)}>
          <Link2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Remove link"
          disabled={!state.link}
          onClick={() => editor.chain().focus().extendMarkRange("link").unsetLink().run()}
        >
          <Link2Off className="size-4" />
        </ToolbarButton>
        {!compact && (
          <>
            <ToolbarButton label="Insert image" disabled={uploading} onClick={() => fileRef.current?.click()}>
              {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
            </ToolbarButton>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
          </>
        )}
        <Divider />
        <ToolbarButton label="Undo" disabled={!state.canUndo} onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton label="Redo" disabled={!state.canRedo} onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="size-4" />
        </ToolbarButton>
      </div>
      {error && <p className="px-2 pt-1 text-xs text-red-600">{error}</p>}
      {linkOpen && (
        <LinkDialog editor={editor} options={linkOptions} onClose={() => setLinkOpen(false)} />
      )}
    </div>
  );
}

/** WYSIWYG editor (Tiptap) that serialises to HTML. Two ways to use it:
 *  - uncontrolled inside a `<form action>`: pass `name` and the HTML lands in a hidden input;
 *  - controlled: pass `onChange` (used by the schema-driven page editor).
 *  Links can point at any internal page via the picker in `linkOptions`; inserted images are
 *  uploaded to Postgres through /api/admin/upload like every other image field. */
export function RichTextEditor({
  label,
  name,
  defaultValue,
  onChange,
  linkOptions = [],
  compact = false,
  minHeight = 200,
  required,
  hint,
}: {
  label?: string;
  name?: string;
  defaultValue?: string;
  onChange?: (html: string) => void;
  linkOptions?: LinkOption[];
  /** Hide block-level tools (headings, quotes, images, alignment) for short copy. */
  compact?: boolean;
  minHeight?: number;
  required?: boolean;
  hint?: string;
}) {
  const [html, setHtml] = useState(defaultValue ?? "");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } },
        heading: { levels: [1, 2, 3, 4] },
      }),
      TextStyle,
      FontSize,
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start writing…" }),
    ],
    content: defaultValue ?? "",
    editorProps: {
      attributes: { class: "rich-content rich-editor-body focus:outline-none", style: `min-height:${minHeight}px` },
    },
    onUpdate: ({ editor: e }) => {
      const value = e.isEmpty ? "" : e.getHTML();
      setHtml(value);
      onChange?.(value);
    },
  });

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-ink">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      {name && <input type="hidden" name={name} value={html} />}
      <div className="rounded-xl border border-[#d5d7da] bg-white focus-within:border-primary">
        {editor ? (
          <Toolbar editor={editor} linkOptions={linkOptions} compact={compact} />
        ) : (
          <div className="h-[45px] border-b border-[#d5d7da] bg-[#fafafa]" />
        )}
        <div className="px-4 py-3">
          <EditorContent editor={editor} />
        </div>
      </div>
      {hint && <p className="text-xs text-body">{hint}</p>}
    </div>
  );
}
