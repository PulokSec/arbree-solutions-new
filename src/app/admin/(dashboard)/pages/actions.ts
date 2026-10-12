"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { parsePageContent } from "@/lib/page-content";

type PageKey = "home" | "about" | "services";

const PAGE_PATH: Record<PageKey, string> = { home: "/", about: "/about", services: "/services" };

export async function savePageContent(page: PageKey, contentJson: string) {
  const session = await auth();
  if (!session?.user) throw new Error("You need to be signed in.");

  let parsed: unknown;
  try {
    parsed = JSON.parse(contentJson);
  } catch {
    throw new Error("That's not valid content — reload the page and try again.");
  }

  // Validate the known shape for the public page, but store the editor's full JSON so keys the
  // schema doesn't model (e.g. the Services overview items) survive a round-trip.
  parsePageContent(page, parsed);
  const content = parsed as object;

  await prisma.pageContent.upsert({
    where: { page },
    create: { page, content },
    update: { content },
  });

  revalidatePath("/admin/pages");
  revalidatePath(PAGE_PATH[page]);
}
