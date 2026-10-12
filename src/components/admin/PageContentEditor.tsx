"use client";

import { useRef, useState, useTransition } from "react";
import { ArrowDown, ArrowUp, Check, Loader2, Plus, Trash2 } from "lucide-react";
import { RichTextEditor, type LinkOption } from "@/components/admin/RichTextEditor";
import { ImageGalleryField, ImageUploadField } from "@/components/admin/ImageUploadField";
import { ICON_KEYS, type FieldDef } from "@/lib/page-schemas";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
type Obj = { [key: string]: Json };

const inputClass =
  "rounded-xl border border-[#d5d7da] px-4 py-2.5 text-base text-ink outline-none focus:border-primary";

let idCounter = 0;
const newId = () => `i${++idCounter}`;

/** Give every object inside an array a stable `__id` so React keeps each row's editor state
 * attached to the right row when rows are removed or re-ordered. Stripped again on save. */
function withIds(value: Json): Json {
  if (Array.isArray(value)) {
    return value.map((v) => (v && typeof v === "object" && !Array.isArray(v) ? { __id: newId(), ...(withIds(v) as Obj) } : withIds(v)));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withIds(v)]));
  }
  return value;
}

/** Drop UI-only ids and empty values so blank fields fall back to the page's built-in copy. */
function prune(value: Json): Json | undefined {
  if (typeof value === "string") {
    const stripped = value.replace(/<[^>]*>/g, "").trim();
    // "<p></p>" and friends count as empty, but keep HTML containing images / rules.
    if (value.trim() === "" || (stripped === "" && !/<(img|hr)/i.test(value))) return undefined;
    return value;
  }
  if (Array.isArray(value)) {
    const items = value.map(prune).filter((v) => v !== undefined) as Json[];
    return items.length ? items : undefined;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .filter(([k]) => !k.startsWith("__"))
      .map(([k, v]) => [k, prune(v)] as const)
      .filter(([, v]) => v !== undefined) as [string, Json][];
    return entries.length ? (Object.fromEntries(entries) as Json) : undefined;
  }
  return value;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-ink">{children}</label>;
}

function RowControls({
  index,
  count,
  onMove,
  onRemove,
}: {
  index: number;
  count: number;
  onMove: (dir: -1 | 1) => void;
  onRemove: () => void;
}) {
  const btn = "flex size-7 items-center justify-center rounded-lg text-body hover:bg-[#f0f0f0] disabled:opacity-30";
  return (
    <div className="flex items-center gap-0.5">
      <button type="button" className={btn} disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move up">
        <ArrowUp className="size-4" />
      </button>
      <button type="button" className={btn} disabled={index === count - 1} onClick={() => onMove(1)} aria-label="Move down">
        <ArrowDown className="size-4" />
      </button>
      <button type="button" className={`${btn} hover:text-red-600`} onClick={onRemove} aria-label="Remove">
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const next = [...arr];
  const j = i + dir;
  if (j < 0 || j >= next.length) return next;
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

function RichList({
  def,
  value,
  onChange,
  linkOptions,
}: {
  def: Extract<FieldDef, { type: "richList" }>;
  value: string[];
  onChange: (v: string[]) => void;
  linkOptions: LinkOption[];
}) {
  // Rows carry their own ids locally; the parent only ever sees the plain HTML strings.
  const [rows, setRows] = useState(() => value.map((html) => ({ id: newId(), html })));
  const commit = (next: typeof rows) => {
    setRows(next);
    onChange(next.map((r) => r.html));
  };

  return (
    <div className="flex flex-col gap-3">
      <Label>{def.label}</Label>
      {rows.map((row, i) => (
        <div key={row.id} className="flex flex-col gap-2 rounded-xl border border-ink/10 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-body">
              {def.itemLabel} {i + 1}
            </span>
            <RowControls
              index={i}
              count={rows.length}
              onMove={(dir) => commit(move(rows, i, dir))}
              onRemove={() => commit(rows.filter((_, idx) => idx !== i))}
            />
          </div>
          <RichTextEditor
            compact
            minHeight={100}
            linkOptions={linkOptions}
            defaultValue={row.html}
            onChange={(html) => commit(rows.map((r) => (r.id === row.id ? { ...r, html } : r)))}
          />
        </div>
      ))}
      <AddButton label={`Add ${def.itemLabel.toLowerCase()}`} onClick={() => commit([...rows, { id: newId(), html: "" }])} />
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-fit items-center gap-1.5 rounded-full border border-dashed border-primary px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary-soft"
    >
      <Plus className="size-4" /> {label}
    </button>
  );
}

function FieldRenderer({
  def,
  value,
  onChange,
  linkOptions,
}: {
  def: FieldDef;
  value: Json | undefined;
  onChange: (v: Json) => void;
  linkOptions: LinkOption[];
}) {
  switch (def.type) {
    case "text":
      return (
        <div className="flex flex-col gap-1.5">
          <Label>{def.label}</Label>
          <input className={inputClass} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} />
        </div>
      );
    case "textarea":
      return (
        <div className="flex flex-col gap-1.5">
          <Label>{def.label}</Label>
          <textarea
            rows={3}
            className={`${inputClass} resize-y`}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
    case "link": {
      const listId = `links-${def.key}`;
      return (
        <div className="flex flex-col gap-1.5">
          <Label>{def.label}</Label>
          <input
            className={inputClass}
            list={listId}
            placeholder="/services  or  https://…"
            value={(value as string) ?? ""}
            onChange={(e) => onChange(e.target.value)}
          />
          <datalist id={listId}>
            {linkOptions.map((o) => (
              <option key={o.href} value={o.href}>
                {o.label}
              </option>
            ))}
          </datalist>
        </div>
      );
    }
    case "icon":
      return (
        <div className="flex flex-col gap-1.5">
          <Label>{def.label}</Label>
          <select className={inputClass} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)}>
            <option value="">Default</option>
            {ICON_KEYS.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      );
    case "richtext":
      return (
        <RichTextEditor
          label={def.label}
          compact={def.compact}
          minHeight={def.compact ? 110 : 220}
          linkOptions={linkOptions}
          defaultValue={(value as string) ?? ""}
          onChange={onChange}
          hint={def.hint}
        />
      );
    case "image":
      return (
        <ImageUploadField
          label={def.label}
          name={`img-${def.key}`}
          defaultValue={(value as string) ?? ""}
          onChange={onChange}
          hint={def.hint}
        />
      );
    case "imageList":
      return (
        <ImageGalleryField
          label={def.label}
          name={`gallery-${def.key}`}
          defaultValue={(value as string[]) ?? []}
          onChange={onChange}
        />
      );
    case "stringList": {
      const items = (value as string[]) ?? [];
      return (
        <div className="flex flex-col gap-2">
          <Label>{def.label}</Label>
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                className={`${inputClass} flex-1`}
                value={item}
                onChange={(e) => onChange(items.map((v, idx) => (idx === i ? e.target.value : v)))}
              />
              <RowControls
                index={i}
                count={items.length}
                onMove={(dir) => onChange(move(items, i, dir))}
                onRemove={() => onChange(items.filter((_, idx) => idx !== i))}
              />
            </div>
          ))}
          <AddButton label={`Add ${def.itemLabel.toLowerCase()}`} onClick={() => onChange([...items, ""])} />
        </div>
      );
    }
    case "richList":
      return (
        <RichList def={def} value={(value as string[]) ?? []} onChange={onChange} linkOptions={linkOptions} />
      );
    case "group": {
      const obj = (value as Obj) ?? {};
      return (
        <fieldset className="flex flex-col gap-4 rounded-2xl border border-ink/10 p-5">
          <legend className="px-2 text-base font-semibold text-ink">{def.label}</legend>
          {def.fields.map((f) => (
            <FieldRenderer
              key={f.key}
              def={f}
              value={obj[f.key]}
              onChange={(v) => onChange({ ...obj, [f.key]: v })}
              linkOptions={linkOptions}
            />
          ))}
        </fieldset>
      );
    }
    case "list": {
      const items = (value as Obj[]) ?? [];
      return (
        <div className="flex flex-col gap-3">
          <Label>{def.label}</Label>
          {items.map((item, i) => (
            <div key={(item.__id as string) ?? i} className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-[#fcfcfc] p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wide text-body">
                  {def.itemLabel} {i + 1}
                </span>
                <RowControls
                  index={i}
                  count={items.length}
                  onMove={(dir) => onChange(move(items, i, dir))}
                  onRemove={() => onChange(items.filter((_, idx) => idx !== i))}
                />
              </div>
              {def.fields.map((f) => (
                <FieldRenderer
                  key={f.key}
                  def={f}
                  value={item[f.key]}
                  onChange={(v) => onChange(items.map((it, idx) => (idx === i ? { ...it, [f.key]: v } : it)))}
                  linkOptions={linkOptions}
                />
              ))}
            </div>
          ))}
          <AddButton label={`Add ${def.itemLabel.toLowerCase()}`} onClick={() => onChange([...items, { __id: newId() }])} />
        </div>
      );
    }
  }
}

/** Schema-driven form for a page's `PageContent` JSON. Starts from the live content (stored
 * values layered over the built-in defaults) and saves through `onSave` as pruned JSON, so
 * anything left blank keeps falling back to the built-in copy. Keys the schema doesn't know
 * about (older hand-written JSON) are preserved untouched. */
export function PageContentEditor({
  fields,
  initial,
  linkOptions,
  onSave,
  viewHref,
}: {
  fields: FieldDef[];
  initial: Obj;
  linkOptions: LinkOption[];
  onSave: (json: string) => Promise<void>;
  viewHref: string;
}) {
  const [content, setContent] = useState<Obj>(() => withIds(initial) as Obj);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const dirty = useRef(false);

  function update(key: string, v: Json) {
    dirty.current = true;
    setStatus("idle");
    setContent((prev) => ({ ...prev, [key]: v }));
  }

  function save() {
    setError(null);
    startTransition(async () => {
      try {
        await onSave(JSON.stringify(prune(content) ?? {}));
        dirty.current = false;
        setStatus("saved");
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Couldn't save");
      }
    });
  }

  return (
    <div className="flex flex-col gap-5">
      {fields.map((f) => (
        <FieldRenderer
          key={f.key}
          def={f}
          value={content[f.key]}
          onChange={(v) => update(f.key, v)}
          linkOptions={linkOptions}
        />
      ))}

      <div className="sticky bottom-4 z-10 flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 shadow-lg">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="flex h-11 items-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending && <Loader2 className="size-4 animate-spin" />}
          {pending ? "Saving…" : "Save changes"}
        </button>
        <a href={viewHref} target="_blank" rel="noreferrer" className="text-sm text-body hover:text-primary">
          View page ↗
        </a>
        {status === "saved" && (
          <span className="flex items-center gap-1 text-sm text-green-700">
            <Check className="size-4" /> Saved
          </span>
        )}
        {status === "error" && <span className="text-sm text-red-600">{error}</span>}
      </div>
    </div>
  );
}
