import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogListItem } from "@/lib/blog";

function formatDate(date: Date | null) {
  if (!date) return null;
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogGrid({ posts }: { posts: BlogListItem[] }) {
  if (posts.length === 0) {
    return (
      <section className="bg-white px-[30px] py-16 lg:p-[60px]">
        <div className="mx-auto max-w-[1320px] rounded-2xl border border-dashed border-ink/15 py-16 text-center text-body">
          No posts published yet — check back soon.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col items-start gap-5 rounded-[20px] border border-ink/10 bg-white p-5"
          >
            <div className="aspect-[380/255] w-full overflow-hidden rounded-2xl bg-primary-soft">
              {post.featuredImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-xs text-primary/60">
                  No featured image yet
                </div>
              )}
            </div>

            <div className="flex w-full flex-col items-start gap-3">
              {formatDate(post.publishedAt) && (
                <p className="text-sm text-body">{formatDate(post.publishedAt)}</p>
              )}
              <p className="text-xl font-medium leading-tight text-ink">{post.title}</p>
              <p className="line-clamp-3 text-sm leading-6 text-body">{post.excerpt}</p>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-80"
            >
              Read more
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
