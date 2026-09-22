"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { readSeoFields } from "@/components/admin/SeoFieldsSection";

const portfolioSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  countryCode: z.string().length(2),
  summary: z.string().min(1),
  description: z.string().min(1),
  coverImage: z.string().min(1),
  clientName: z.string().optional(),
  duration: z.string().optional(),
  teamSize: z.string().optional(),
  tags: z.string().optional(),
  overview: z.string().optional(),
  caseStudyDetailJson: z.string().optional(),
});

export async function createPortfolioItem(formData: FormData) {
  const parsed = portfolioSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    countryCode: formData.get("countryCode"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    clientName: formData.get("clientName") || undefined,
    duration: formData.get("duration") || undefined,
    teamSize: formData.get("teamSize") || undefined,
    tags: formData.get("tags") || undefined,
    overview: formData.get("overview") || undefined,
    caseStudyDetailJson: formData.get("caseStudyDetailJson") || undefined,
  });

  const tags =
    parsed.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  let caseStudyDetail: object | undefined;
  if (parsed.caseStudyDetailJson) {
    try {
      caseStudyDetail = JSON.parse(parsed.caseStudyDetailJson);
    } catch {
      throw new Error(
        "Case study JSON is not valid JSON — check the syntax and try again.",
      );
    }
  }

  const gallery = formData.getAll("gallery").filter((v): v is string => typeof v === "string" && v.trim() !== "");

  await prisma.portfolioItem.create({
    data: {
      title: parsed.title,
      slug: parsed.slug,
      countryCode: parsed.countryCode.toUpperCase(),
      summary: parsed.summary,
      description: parsed.description,
      coverImage: parsed.coverImage,
      gallery,
      client: parsed.clientName,
      duration: parsed.duration,
      teamSize: parsed.teamSize,
      tags,
      overview: parsed.overview,
      caseStudyDetail,
      ...readSeoFields(formData),
    },
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function updatePortfolioItem(id: string, formData: FormData) {
  const parsed = portfolioSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    countryCode: formData.get("countryCode"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage"),
    clientName: formData.get("clientName") || undefined,
    duration: formData.get("duration") || undefined,
    teamSize: formData.get("teamSize") || undefined,
    tags: formData.get("tags") || undefined,
    overview: formData.get("overview") || undefined,
    caseStudyDetailJson: formData.get("caseStudyDetailJson") || undefined,
  });

  const tags =
    parsed.tags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];

  let caseStudyDetail: object | undefined;
  if (parsed.caseStudyDetailJson) {
    try {
      caseStudyDetail = JSON.parse(parsed.caseStudyDetailJson);
    } catch {
      throw new Error(
        "Case study JSON is not valid JSON — check the syntax and try again.",
      );
    }
  }

  const gallery = formData.getAll("gallery").filter((v): v is string => typeof v === "string" && v.trim() !== "");

  await prisma.portfolioItem.update({
    where: { id },
    data: {
      title: parsed.title,
      slug: parsed.slug,
      countryCode: parsed.countryCode.toUpperCase(),
      summary: parsed.summary,
      description: parsed.description,
      coverImage: parsed.coverImage,
      gallery,
      client: parsed.clientName,
      duration: parsed.duration,
      teamSize: parsed.teamSize,
      tags,
      overview: parsed.overview,
      caseStudyDetail,
      ...readSeoFields(formData),
    },
  });

  revalidatePath("/admin/portfolio");
  revalidatePath("/");
  revalidatePath("/portfolio");
  redirect("/admin/portfolio");
}

export async function deletePortfolioItem(id: string) {
  "use server";
  await prisma.portfolioItem.delete({ where: { id } });
  revalidatePath("/admin/portfolio");
  revalidatePath("/");
}
