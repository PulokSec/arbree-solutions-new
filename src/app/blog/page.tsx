import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlogHero } from "@/components/sections/blog/BlogHero";
import { BlogGrid } from "@/components/sections/blog/BlogGrid";
import { getPublishedBlogPosts } from "@/lib/blog";
import { buildMetadata, getSeoSettings } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings("blog");
  return buildMetadata(seo, {
    title: "Blog",
    description:
      "News, engineering deep-dives, and lessons from building software and teams at Arbree Solutions.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const [posts, seo] = await Promise.all([getPublishedBlogPosts(), getSeoSettings("blog")]);

  return (
    <>
      <Header activePath="/blog" />
      <main className="flex-1">
        <BlogHero heading={seo?.heading ?? undefined} />
        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </>
  );
}
