"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function saveAnalyticsSettings(formData: FormData) {
  const get = (name: string) => {
    const value = formData.get(name);
    return typeof value === "string" && value.trim() !== "" ? value : null;
  };

  const data = {
    gaMeasurementId: get("gaMeasurementId"),
    gtmContainerId: get("gtmContainerId"),
    customHeadSnippet: get("customHeadSnippet"),
    customBodySnippet: get("customBodySnippet"),
  };

  await prisma.analyticsSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data },
    update: data,
  });

  // Analytics scripts render in the root layout, which every route shares —
  // revalidate the whole tree.
  revalidatePath("/", "layout");
  revalidatePath("/admin/analytics");
}
