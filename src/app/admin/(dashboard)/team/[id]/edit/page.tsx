import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TeamMemberForm } from "../../TeamMemberForm";
import { updateTeamMember } from "../../actions";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });

  if (!member) notFound();

  return (
    <TeamMemberForm
      title="Edit Team Member"
      action={updateTeamMember.bind(null, id)}
      submitLabel="Save Changes"
      defaults={{
        name: member.name,
        role: member.role,
        bio: member.bio,
        photo: member.photo,
        linkedIn: member.linkedIn,
      }}
    />
  );
}
