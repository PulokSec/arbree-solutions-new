import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export function EditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex size-8 items-center justify-center rounded-lg text-body transition-colors hover:bg-primary-soft hover:text-primary"
      aria-label="Edit"
    >
      <Pencil className="size-4" strokeWidth={1.75} />
    </Link>
  );
}

export function AdminPageHeader({
  title,
  description,
  newHref,
  newLabel = "Add New",
}: {
  title: string;
  description: string;
  newHref?: string;
  newLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-ink">{title}</h1>
        <p className="text-sm text-body">{description}</p>
      </div>
      {newHref && (
        <Link
          href={newHref}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" strokeWidth={2} />
          {newLabel}
        </Link>
      )}
    </div>
  );
}

export function AdminEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/15 bg-white py-16 text-center">
      <p className="text-sm text-body">{message}</p>
    </div>
  );
}

export function AdminTable({
  columns,
  children,
}: {
  columns: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-ink/10 bg-[#f8f8f8]">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-5 py-3 font-medium text-body">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10">{children}</tbody>
      </table>
    </div>
  );
}
