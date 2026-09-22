"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const testimonialSchema = z.object({
  quote: z.string().min(1),
  authorName: z.string().min(1),
  authorTitle: z.string().min(1),
  authorAvatar: z.string().optional(),
  rating: z.coerce.number().min(1).max(5),
});

export async function createTestimonial(formData: FormData) {
  const parsed = testimonialSchema.parse({
    quote: formData.get("quote"),
    authorName: formData.get("authorName"),
    authorTitle: formData.get("authorTitle"),
    authorAvatar: formData.get("authorAvatar") || undefined,
    rating: formData.get("rating") || 5,
  });

  await prisma.testimonial.create({ data: parsed });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(id: string, formData: FormData) {
  const parsed = testimonialSchema.parse({
    quote: formData.get("quote"),
    authorName: formData.get("authorName"),
    authorTitle: formData.get("authorTitle"),
    authorAvatar: formData.get("authorAvatar") || undefined,
    rating: formData.get("rating") || 5,
  });

  await prisma.testimonial.update({ where: { id }, data: parsed });

  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
  "use server";
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}
