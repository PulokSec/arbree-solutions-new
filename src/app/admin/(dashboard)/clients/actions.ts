"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const clientLogoSchema = z.object({
  name: z.string().min(1),
  logo: z.string().min(1),
  url: z.string().optional(),
});

export async function createClientLogo(formData: FormData) {
  const parsed = clientLogoSchema.parse({
    name: formData.get("name"),
    logo: formData.get("logo"),
    url: formData.get("url") || undefined,
  });

  await prisma.clientLogo.create({ data: parsed });

  revalidatePath("/admin/clients");
  revalidatePath("/");
  redirect("/admin/clients");
}

export async function updateClientLogo(id: string, formData: FormData) {
  const parsed = clientLogoSchema.parse({
    name: formData.get("name"),
    logo: formData.get("logo"),
    url: formData.get("url") || undefined,
  });

  await prisma.clientLogo.update({ where: { id }, data: parsed });

  revalidatePath("/admin/clients");
  revalidatePath("/");
  redirect("/admin/clients");
}

export async function deleteClientLogo(id: string) {
  "use server";
  await prisma.clientLogo.delete({ where: { id } });
  revalidatePath("/admin/clients");
  revalidatePath("/");
}
