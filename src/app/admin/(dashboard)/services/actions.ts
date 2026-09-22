"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { readSeoFields } from "@/components/admin/SeoFieldsSection";

const serviceSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(["TECH_SOLUTION", "TEAM_AUGMENTATION"]),
  summary: z.string().min(1),
  description: z.string().min(1),
  iconKey: z.string().min(1),
  coverImage: z.string().optional(),
  tags: z.string().optional(), // comma-separated, split below
});

function parseServiceForm(formData: FormData) {
  return serviceSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    iconKey: formData.get("iconKey"),
    coverImage: formData.get("coverImage") || undefined,
    tags: formData.get("tags") || undefined,
  });
}

export async function createService(formData: FormData) {
  const parsed = parseServiceForm(formData);

  const tagLabels =
    parsed.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  await prisma.service.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      category: parsed.category,
      summary: parsed.summary,
      description: parsed.description,
      iconKey: parsed.iconKey,
      coverImage: parsed.coverImage,
      tags: { create: tagLabels.map((label, order) => ({ label, order })) },
      ...readSeoFields(formData),
    },
  });

  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function updateService(id: string, formData: FormData) {
  const parsed = parseServiceForm(formData);

  const tagLabels =
    parsed.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  await prisma.$transaction([
    prisma.serviceTag.deleteMany({ where: { serviceId: id } }),
    prisma.service.update({
      where: { id },
      data: {
        title: parsed.title,
        slug: parsed.slug,
        category: parsed.category,
        summary: parsed.summary,
        description: parsed.description,
        iconKey: parsed.iconKey,
        coverImage: parsed.coverImage,
        tags: { create: tagLabels.map((label, order) => ({ label, order })) },
        ...readSeoFields(formData),
      },
    }),
  ]);

  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  "use server";
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
  revalidatePath("/services");
}
