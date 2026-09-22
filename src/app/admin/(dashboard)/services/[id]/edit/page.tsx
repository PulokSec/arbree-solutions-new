import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "../../ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const service = await prisma.service.findUnique({
    where: { id },
    include: { tags: { orderBy: { order: "asc" } } },
  });

  if (!service) notFound();

  return (
    <ServiceForm
      title="Edit Service"
      action={updateService.bind(null, id)}
      submitLabel="Save Changes"
      defaults={{
        title: service.title,
        slug: service.slug,
        category: service.category,
        summary: service.summary,
        description: service.description,
        iconKey: service.iconKey,
        coverImage: service.coverImage,
        tags: service.tags.map((t: { label: string }) => t.label).join(", "),
        metaTitle: service.metaTitle,
        metaDescription: service.metaDescription,
        metaKeywords: service.metaKeywords,
        ogTitle: service.ogTitle,
        ogDescription: service.ogDescription,
        ogImage: service.ogImage,
        twitterTitle: service.twitterTitle,
        twitterDescription: service.twitterDescription,
        twitterImage: service.twitterImage,
      }}
    />
  );
}
