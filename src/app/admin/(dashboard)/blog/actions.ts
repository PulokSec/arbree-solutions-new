"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { readSeoFields } from "@/components/admin/SeoFieldsSection";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().optional(),
  author: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean(),
  publishedAt: z.string().optional(),
});

function parseBlogForm(formData: FormData) {
  return blogSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    featuredImage: formData.get("featuredImage") || undefined,
    author: formData.get("author") || undefined,
    tags: formData.get("tags") || undefined,
    published: formData.get("published") === "on",
    publishedAt: formData.get("publishedAt") || undefined,
  });
}

function buildBlogData(parsed: ReturnType<typeof parseBlogForm>, formData: FormData) {
  const tags =
    parsed.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  const publishedAt = parsed.published
    ? parsed.publishedAt
      ? new Date(parsed.publishedAt)
      : new Date()
    : null;

  return {
    title: parsed.title,
    slug: parsed.slug,
    excerpt: parsed.excerpt,
    content: parsed.content,
    featuredImage: parsed.featuredImage,
    author: parsed.author,
    tags,
    published: parsed.published,
    publishedAt,
    ...readSeoFields(formData),
  };
}

export async function createBlogPost(formData: FormData) {
  const parsed = parseBlogForm(formData);
  await prisma.blog.create({ data: buildBlogData(parsed, formData) });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
  const parsed = parseBlogForm(formData);
  await prisma.blog.update({ where: { id }, data: buildBlogData(parsed, formData) });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.slug}`);
  redirect("/admin/blog");
}

export async function deleteBlogPost(id: string) {
  "use server";
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
