import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BlogForm } from "../../BlogForm";
import { updateBlogPost } from "../../actions";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blog.findUnique({ where: { id } });

  if (!post) notFound();

  return (
    <BlogForm
      title="Edit Blog Post"
      action={updateBlogPost.bind(null, id)}
      submitLabel="Save Changes"
      defaults={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        featuredImage: post.featuredImage,
        author: post.author,
        tags: post.tags.join(", "),
        published: post.published,
        publishedAt: post.publishedAt
          ? new Date(post.publishedAt).toISOString().slice(0, 10)
          : undefined,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        metaKeywords: post.metaKeywords,
        ogTitle: post.ogTitle,
        ogDescription: post.ogDescription,
        ogImage: post.ogImage,
        twitterTitle: post.twitterTitle,
        twitterDescription: post.twitterDescription,
        twitterImage: post.twitterImage,
      }}
    />
  );
}
