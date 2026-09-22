import { TeamMemberForm } from "../TeamMemberForm";
import { createTeamMember } from "../actions";

export default function NewTeamMemberPage() {
  return (
    <TeamMemberForm title="New Team Member" action={createTeamMember} submitLabel="Save Team Member" />
  );
}
