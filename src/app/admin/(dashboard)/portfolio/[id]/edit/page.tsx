import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PortfolioForm } from "../../PortfolioForm";
import { updatePortfolioItem } from "../../actions";

export default async function EditPortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.portfolioItem.findUnique({ where: { id } });

  if (!item) notFound();

  return (
    <PortfolioForm
      title="Edit Portfolio Item"
      action={updatePortfolioItem.bind(null, id)}
      submitLabel="Save Changes"
      defaults={{
        title: item.title,
        slug: item.slug,
        countryCode: item.countryCode,
        summary: item.summary,
        description: item.description,
        coverImage: item.coverImage,
        gallery: item.gallery,
        clientName: item.client,
        duration: item.duration,
        teamSize: item.teamSize,
        tags: item.tags.join(", "),
        overview: item.overview,
        caseStudyDetailJson: item.caseStudyDetail
          ? JSON.stringify(item.caseStudyDetail, null, 2)
          : undefined,
        metaTitle: item.metaTitle,
        metaDescription: item.metaDescription,
        metaKeywords: item.metaKeywords,
        ogTitle: item.ogTitle,
        ogDescription: item.ogDescription,
        ogImage: item.ogImage,
        twitterTitle: item.twitterTitle,
        twitterDescription: item.twitterDescription,
        twitterImage: item.twitterImage,
      }}
    />
  );
}
