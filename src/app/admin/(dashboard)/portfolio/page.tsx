import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminTable, AdminEmptyState, EditLink } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deletePortfolioItem } from "./actions";

export default async function AdminPortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <div>
      <AdminPageHeader
        title="Portfolio"
        description="Case studies shown on the Home, Portfolio, and Portfolio Details pages."
        newHref="/admin/portfolio/new"
      />

      {items.length === 0 ? (
        <AdminEmptyState message="No portfolio items yet — add your first project." />
      ) : (
        <AdminTable columns={["Title", "Client", "Tags", ""]}>
          {items.map((item) => (
            <tr key={item.id}>
              <td className="px-5 py-4 font-medium text-ink">{item.title}</td>
              <td className="px-5 py-4 text-body">{item.client ?? "—"}</td>
              <td className="px-5 py-4 text-body">{item.tags.join(", ") || "—"}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditLink href={`/admin/portfolio/${item.id}/edit`} />
                  <DeleteButton action={deletePortfolioItem.bind(null, item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

async function getPortfolioItems() {
  try {
    return await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}
