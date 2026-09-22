"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { readSeoFields } from "@/components/admin/SeoFieldsSection";

const PAGE_PATHS: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  portfolio: "/portfolio",
  contact: "/contact",
  blog: "/blog",
};

export async function saveSeoSettings(page: string, formData: FormData) {
  const heading = formData.get("heading");
  const featuredImage = formData.get("featuredImage");

  await prisma.seoSettings.upsert({
    where: { page },
    create: {
      page,
      heading: typeof heading === "string" && heading.trim() ? heading : undefined,
      featuredImage:
        typeof featuredImage === "string" && featuredImage.trim() ? featuredImage : undefined,
      ...readSeoFields(formData),
    },
    update: {
      heading: typeof heading === "string" && heading.trim() ? heading : null,
      featuredImage:
        typeof featuredImage === "string" && featuredImage.trim() ? featuredImage : null,
      ...readSeoFields(formData),
    },
  });

  revalidatePath("/admin/seo");
  revalidatePath(PAGE_PATHS[page] ?? "/");
  redirect("/admin/seo");
}
