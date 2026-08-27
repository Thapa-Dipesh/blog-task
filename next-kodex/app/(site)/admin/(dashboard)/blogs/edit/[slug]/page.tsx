import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/db/posts";
import { EditPostForm } from "@/components/site/blog/edit-post-form";

interface EditPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: EditPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: post ? `Edit: ${post.title} | KODEX.` : "Edit Post | KODEX.",
  };
}

export default async function EditPostPage({ params }: EditPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <EditPostForm post={post as any} />;
}
