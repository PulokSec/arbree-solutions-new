"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function savePageContent(page: "about" | "services", formData: FormData) {
  const raw = formData.get("contentJson");
  if (typeof raw !== "string" || raw.trim() === "") {
    throw new Error("Content JSON can't be empty.");
  }

  let content: object;
  try {
    content = JSON.parse(raw);
  } catch {
    throw new Error("That's not valid JSON — check the syntax and try again.");
  }

  await prisma.pageContent.upsert({
    where: { page },
    create: { page, content },
    update: { content },
  });

  revalidatePath("/admin/pages");
  revalidatePath(page === "about" ? "/about" : "/services");
}
