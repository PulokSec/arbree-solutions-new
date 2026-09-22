import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminTable, AdminEmptyState, EditLink } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteService } from "./actions";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <AdminPageHeader
        title="Services"
        description="Tech Solution and Team Augmentation offerings shown on the Home and Services pages."
        newHref="/admin/services/new"
      />

      {services.length === 0 ? (
        <AdminEmptyState message="No services yet — add your first one to replace the placeholder content on the site." />
      ) : (
        <AdminTable columns={["Title", "Category", "Tags", ""]}>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="px-5 py-4 font-medium text-ink">{service.title}</td>
              <td className="px-5 py-4 text-body">
                {service.category === "TECH_SOLUTION" ? "Tech Solution" : "Team Augmentation"}
              </td>
              <td className="px-5 py-4 text-body">
                {service.tags.map((t: { label: string }) => t.label).join(", ") || "—"}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditLink href={`/admin/services/${service.id}/edit`} />
                  <DeleteButton action={deleteService.bind(null, service.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

async function getServices() {
  try {
    return await prisma.service.findMany({
      include: { tags: true },
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}
