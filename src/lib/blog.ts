import { prisma } from "@/lib/prisma";

export type BlogListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  author: string | null;
  tags: string[];
  publishedAt: Date | null;
};

export async function getPublishedBlogPosts(): Promise<BlogListItem[]> {
  try {
    const posts = await prisma.blog.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { order: "asc" }],
    });
    return posts.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      featuredImage: p.featuredImage,
      author: p.author,
      tags: p.tags,
      publishedAt: p.publishedAt,
    }));
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    return await prisma.blog.findUnique({ where: { slug } });
  } catch {
    return null;
  }
}
