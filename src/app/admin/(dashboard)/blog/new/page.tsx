import { BlogForm } from "../BlogForm";
import { createBlogPost } from "../actions";

export default function NewBlogPostPage() {
  return <BlogForm title="New Blog Post" action={createBlogPost} submitLabel="Save Post" />;
}
