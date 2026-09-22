import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../../TestimonialForm";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) notFound();

  return (
    <TestimonialForm
      title="Edit Testimonial"
      action={updateTestimonial.bind(null, id)}
      submitLabel="Save Changes"
      defaults={{
        quote: testimonial.quote,
        authorName: testimonial.authorName,
        authorTitle: testimonial.authorTitle,
        authorAvatar: testimonial.authorAvatar,
        rating: testimonial.rating,
      }}
    />
  );
}
