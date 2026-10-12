import { z } from "zod";
import { prisma } from "@/lib/prisma";

const statSchema = z.object({ value: z.string(), label: z.string() });
const iconItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconKey: z.string().optional(),
});

const aboutContentSchema = z.object({
  hero: z
    .object({ title: z.string().optional(), subtitle: z.string().optional(), image: z.string().optional() })
    .optional(),
  story: z
    .object({
      paragraphs: z.array(z.string()).optional(),
      stats: z.array(statSchema).optional(),
      image: z.string().optional(),
    })
    .optional(),
  mission: z
    .object({
      intro: z.string().optional(),
      rows: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    })
    .optional(),
  keyFeatures: z
    .object({ intro: z.string().optional(), items: z.array(iconItemSchema).optional() })
    .optional(),
  commitment: z
    .object({ intro: z.string().optional(), items: z.array(iconItemSchema).optional() })
    .optional(),
  cta: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
});

const homeContentSchema = z.object({
  hero: z
    .object({
      badge: z.string().optional(),
      titleLine1: z.string().optional(),
      titleHighlight: z.string().optional(),
      subtitle: z.string().optional(),
      primaryLabel: z.string().optional(),
      primaryHref: z.string().optional(),
      secondaryLabel: z.string().optional(),
      secondaryHref: z.string().optional(),
    })
    .optional(),
  intro: z
    .object({
      eyebrow: z.string().optional(),
      name: z.string().optional(),
      tagline: z.string().optional(),
      body: z.string().optional(),
    })
    .optional(),
  services: z.object({ eyebrow: z.string().optional(), intro: z.string().optional() }).optional(),
  ourWork: z.object({ intro: z.string().optional() }).optional(),
  testimonial: z.object({ heading: z.string().optional() }).optional(),
  cta: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
});

const serviceDetailSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  benefits: z.array(z.string()).optional(),
  gallery: z.array(z.string()).optional(),
});

const servicesContentSchema = z.object({
  hero: z.object({ title: z.string().optional(), subtitle: z.string().optional() }).optional(),
  overview: z
    .object({ intro: z.string().optional(), items: z.array(iconItemSchema).optional() })
    .optional(),
  // The four detailed service breakdowns (UI/UX Design, Web Development,
  // Mobile App Development, Digital Consultancy). Order in the array is
  // render order; each renders via ServiceDetailSection, alternating
  // image side and background automatically based on its index.
  serviceDetails: z.array(serviceDetailSchema).optional(),
  teamAugmentation: z
    .object({
      intro: z.string().optional(),
      stats: z.array(statSchema).optional(),
      cards: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    })
    .optional(),
  process: z
    .object({ intro: z.string().optional(), steps: z.array(iconItemSchema).optional() })
    .optional(),
  cta: z.object({ title: z.string().optional(), description: z.string().optional() }).optional(),
});

export type HomePageContent = z.infer<typeof homeContentSchema>;
export type AboutPageContent = z.infer<typeof aboutContentSchema>;
export type ServicesPageContent = z.infer<typeof servicesContentSchema>;

export async function getAboutPageContent(): Promise<AboutPageContent | null> {
  try {
    const row = await prisma.pageContent.findUnique({ where: { page: "about" } });
    if (!row) return null;
    const parsed = aboutContentSchema.safeParse(row.content);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function getServicesPageContent(): Promise<ServicesPageContent | null> {
  try {
    const row = await prisma.pageContent.findUnique({ where: { page: "services" } });
    if (!row) return null;
    const parsed = servicesContentSchema.safeParse(row.content);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export async function getHomePageContent(): Promise<HomePageContent | null> {
  try {
    const row = await prisma.pageContent.findUnique({ where: { page: "home" } });
    if (!row) return null;
    const parsed = homeContentSchema.safeParse(row.content);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

/** Zod-validates the JSON the admin editor submits, per page. Throws a readable error. */
export function parsePageContent(page: "home" | "about" | "services", content: unknown) {
  const schema =
    page === "home" ? homeContentSchema : page === "about" ? aboutContentSchema : servicesContentSchema;
  const result = schema.safeParse(content);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(`Invalid content at "${issue.path.join(".")}": ${issue.message}`);
  }
  return result.data;
}
