import { getPostBySlug } from "@/lib/db/posts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SinglePost } from "@/components/site/blog/SinglePost";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metaTitle || `${post.title} | KODEX.`,
    description: post.metaDescription || post.description.slice(0, 160),
    keywords: post.keywords ? post.keywords.split(",").map((k: string) => k.trim()) : undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description.slice(0, 160),
      images: post.image ? [post.image] : [],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <SinglePost post={post as any} />;
}