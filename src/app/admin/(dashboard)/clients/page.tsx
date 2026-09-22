import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminTable, AdminEmptyState, EditLink } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteClientLogo } from "./actions";

export default async function AdminClientsPage() {
  const logos = await getClientLogos();

  return (
    <div>
      <AdminPageHeader
        title="Client Logos"
        description="Logos shown in the Home page 'Trusted by industry leaders' strip."
        newHref="/admin/clients/new"
      />

      {logos.length === 0 ? (
        <AdminEmptyState message="No client logos yet — the homepage is showing neutral placeholders." />
      ) : (
        <AdminTable columns={["Name", "Link", ""]}>
          {logos.map((logo) => (
            <tr key={logo.id}>
              <td className="px-5 py-4 font-medium text-ink">{logo.name}</td>
              <td className="px-5 py-4 text-body">{logo.url ?? "—"}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditLink href={`/admin/clients/${logo.id}/edit`} />
                  <DeleteButton action={deleteClientLogo.bind(null, logo.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

async function getClientLogos() {
  try {
    return await prisma.clientLogo.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}
