import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminTable, AdminEmptyState, EditLink } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteTestimonial } from "./actions";

export default async function AdminTestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <AdminPageHeader
        title="Testimonials"
        description="Client quotes shown in the Home page testimonial carousel."
        newHref="/admin/testimonials/new"
      />

      {testimonials.length === 0 ? (
        <AdminEmptyState message="No testimonials yet — the homepage is showing the placeholder quote." />
      ) : (
        <AdminTable columns={["Author", "Title", "Rating", ""]}>
          {testimonials.map((t) => (
            <tr key={t.id}>
              <td className="px-5 py-4 font-medium text-ink">{t.authorName}</td>
              <td className="px-5 py-4 text-body">{t.authorTitle}</td>
              <td className="px-5 py-4 text-body">{t.rating}/5</td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditLink href={`/admin/testimonials/${t.id}/edit`} />
                  <DeleteButton action={deleteTestimonial.bind(null, t.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}
