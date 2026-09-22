import { TestimonialForm } from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <TestimonialForm title="New Testimonial" action={createTestimonial} submitLabel="Save Testimonial" />
  );
}
