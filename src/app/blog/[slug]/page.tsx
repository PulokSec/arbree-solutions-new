import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/sections/shared/CtaBanner";
import { getBlogPostBySlug } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return buildMetadata(null, { title: "Blog", description: "", path: `/blog/${slug}` });

  return buildMetadata(post, {
    title: post.title,
    description: post.excerpt,
    image: post.featuredImage ?? undefined,
    path: `/blog/${slug}`,
  });
}

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.published) notFound();

  return (
    <>
      <Header activePath="/blog" />
      <main className="flex-1">
        <article className="bg-white px-[30px] pb-16 pt-[140px] lg:px-[60px] lg:pb-[60px] lg:pt-[180px]">
          <div className="mx-auto flex max-w-[820px] flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-4">
              {(formatDate(post.publishedAt) || post.author) && (
                <p className="text-sm text-body">
                  {[formatDate(post.publishedAt), post.author].filter(Boolean).join(" · ")}
                </p>
              )}
              <h1 className="text-[32px] font-bold leading-[1.25] text-ink sm:text-[44px]">
                {post.title}
              </h1>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="rounded-full border border-primary/30 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {post.featuredImage && (
              <div className="aspect-[820/420] w-full overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="size-full object-cover"
                />
              </div>
            )}

            {/* Admin-authored HTML content. Trusted-author input, not
                user-generated — see README for the tradeoff. */}
            <div
              className="prose prose-neutral w-full max-w-none text-body prose-headings:text-ink prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
