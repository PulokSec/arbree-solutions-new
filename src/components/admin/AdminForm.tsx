export function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="rounded-xl border border-[#d5d7da] px-4 py-2.5 text-base text-ink outline-none focus:border-primary"
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  required,
  rows = 4,
  defaultValue,
  placeholder,
  mono = false,
}: {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  defaultValue?: string;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      <textarea
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`resize-none rounded-xl border border-[#d5d7da] px-4 py-2.5 text-ink outline-none focus:border-primary ${
          mono ? "font-mono text-sm" : "text-base"
        }`}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  required,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="rounded-xl border border-[#d5d7da] px-4 py-2.5 text-base text-ink outline-none focus:border-primary"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SubmitButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary text-base font-medium text-white transition-opacity hover:opacity-90"
    >
      {label}
    </button>
  );
}

export function AdminFormShell({
  title,
  backHref,
  backLabel,
  children,
}: {
  title: string;
  backHref: string;
  backLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[680px]">
      <a
        href={backHref}
        className="mb-6 flex items-center gap-1.5 text-sm text-body hover:text-primary"
      >
        ← {backLabel}
      </a>
      <h1 className="mb-6 text-2xl font-semibold text-ink">{title}</h1>
      <form className="flex flex-col gap-5 rounded-2xl border border-ink/10 bg-white p-6">
        {children}
      </form>
    </div>
  );
}
