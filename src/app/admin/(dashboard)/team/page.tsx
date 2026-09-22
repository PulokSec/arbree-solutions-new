import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminTable, AdminEmptyState, EditLink } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTeamMember } from "./actions";

export default async function AdminTeamPage() {
  const members = await getTeamMembers();

  return (
    <div>
      <AdminPageHeader
        title="Team"
        description="Team member profiles (for a future Team/About section)."
        newHref="/admin/team/new"
      />

      {members.length === 0 ? (
        <AdminEmptyState message="No team members yet." />
      ) : (
        <AdminTable columns={["Name", "Role", "LinkedIn", ""]}>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="px-5 py-4 font-medium text-ink">{member.name}</td>
              <td className="px-5 py-4 text-body">{member.role}</td>
              <td className="px-5 py-4 text-body">{member.linkedIn ?? "—"}</td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditLink href={`/admin/team/${member.id}/edit`} />
                  <DeleteButton action={deleteTeamMember.bind(null, member.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

async function getTeamMembers() {
  try {
    return await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}
