"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function markMessageRead(id: string) {
  "use server";
  await prisma.contactMessage.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  "use server";
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
