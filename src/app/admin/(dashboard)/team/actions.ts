"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const teamMemberSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  bio: z.string().optional(),
  photo: z.string().optional(),
  linkedIn: z.string().optional(),
});

export async function createTeamMember(formData: FormData) {
  const parsed = teamMemberSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    bio: formData.get("bio") || undefined,
    photo: formData.get("photo") || undefined,
    linkedIn: formData.get("linkedIn") || undefined,
  });

  await prisma.teamMember.create({ data: parsed });

  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const parsed = teamMemberSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    bio: formData.get("bio") || undefined,
    photo: formData.get("photo") || undefined,
    linkedIn: formData.get("linkedIn") || undefined,
  });

  await prisma.teamMember.update({ where: { id }, data: parsed });

  revalidatePath("/admin/team");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string) {
  "use server";
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
}
