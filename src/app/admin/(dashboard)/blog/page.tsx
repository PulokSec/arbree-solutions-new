import { prisma } from "@/lib/prisma";
import { AdminPageHeader, AdminTable, AdminEmptyState, EditLink } from "@/components/admin/AdminTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteBlogPost } from "./actions";

export default async function AdminBlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
      <AdminPageHeader
        title="Blog"
        description="Posts shown at /blog. Each can carry its own SEO title, description, and social image."
        newHref="/admin/blog/new"
      />

      {posts.length === 0 ? (
        <AdminEmptyState message="No blog posts yet — write your first one." />
      ) : (
        <AdminTable columns={["Title", "Status", "Published", ""]}>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="px-5 py-4 font-medium text-ink">{post.title}</td>
              <td className="px-5 py-4 text-body">
                {post.published ? (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs text-body">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-5 py-4 text-body">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "—"}
              </td>
              <td className="px-5 py-4 text-right">
                <div className="flex items-center justify-end gap-1">
                  <EditLink href={`/admin/blog/${post.id}/edit`} />
                  <DeleteButton action={deleteBlogPost.bind(null, post.id)} />
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      )}
    </div>
  );
}

async function getBlogPosts() {
  try {
    return await prisma.blog.findMany({ orderBy: [{ publishedAt: "desc" }, { order: "asc" }] });
  } catch {
    return [];
  }
}
