import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SinglePost } from "@/components/site/blog/SinglePost";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await api.getPost(slug).catch(() => null);

  return {
    title: post ? `${post.title} | KODEX.` : "Post Not Found",
    description: post?.description || "",
    openGraph: {
      title: post?.title,
      description: post?.description,
      images: post?.image ? [post.image] : [],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = await api.getPost(slug).catch(() => notFound());

  return <SinglePost post={post} />;
}