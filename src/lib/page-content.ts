import { z } from "zod";
import { prisma } from "@/lib/prisma";

const statSchema = z.object({ value: z.string(), label: z.string() });
const iconItemSchema = z.object({
  title: z.string(),
  description: z.string(),
  iconKey: z.string().optional(),
});

const aboutContentSchema = z.object({
  hero: z.object({ title: z.string().optional(), subtitle: z.string().optional() }).optional(),
  story: z
    .object({ paragraphs: z.array(z.string()).optional(), stats: z.array(statSchema).optional() })
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
