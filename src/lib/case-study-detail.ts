import { z } from "zod";
import { resolveIcon } from "./icon-registry";
import type { IconFeatureItem } from "@/components/sections/shared/IconFeatureGrid";
import type { TechHighlight } from "@/components/sections/portfolio-details/TechStackHighlights";
import type { CaseStudyStat } from "@/components/sections/portfolio-details/CaseStudyOverview";
import type { CaseStudyProcessStep } from "@/components/sections/portfolio-details/CaseStudySolutionProcess";

const caseStudyDetailSchema = z.object({
  stats: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  keyFeatures: z
    .array(z.object({ title: z.string(), description: z.string(), iconKey: z.string().optional() }))
    .optional(),
  techStackIntro: z.string().optional(),
  techHighlights: z
    .array(z.object({ title: z.string(), description: z.string(), iconKey: z.string().optional() }))
    .optional(),
  solutionSummary: z.string().optional(),
  process: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
  gallery: z.array(z.string()).optional(),
});

export type ResolvedCaseStudyDetail = {
  stats: CaseStudyStat[];
  keyFeatures: IconFeatureItem[];
  techStackIntro: string;
  techHighlights: TechHighlight[];
  solutionSummary: string;
  process: CaseStudyProcessStep[];
  gallery: string[];
};

/** Safely parses the free-form `caseStudyDetail` JSON column, resolving icon
 * keys to actual components. Returns null if the JSON is missing, malformed,
 * or empty — callers should fall back to a lighter page in that case. */
export function resolveCaseStudyDetail(raw: unknown): ResolvedCaseStudyDetail | null {
  const parsed = caseStudyDetailSchema.safeParse(raw);
  if (!parsed.success) return null;
  const d = parsed.data;

  const hasContent =
    (d.stats?.length ?? 0) > 0 ||
    (d.keyFeatures?.length ?? 0) > 0 ||
    (d.techHighlights?.length ?? 0) > 0 ||
    (d.process?.length ?? 0) > 0;
  if (!hasContent) return null;

  return {
    stats: d.stats ?? [],
    keyFeatures: (d.keyFeatures ?? []).map((f) => ({
      title: f.title,
      description: f.description,
      icon: resolveIcon(f.iconKey),
    })),
    techStackIntro: d.techStackIntro ?? "",
    techHighlights: (d.techHighlights ?? []).map((h) => ({
      title: h.title,
      description: h.description,
      icon: resolveIcon(h.iconKey),
    })),
    solutionSummary: d.solutionSummary ?? "",
    process: d.process ?? [],
    gallery: d.gallery ?? [],
  };
}
