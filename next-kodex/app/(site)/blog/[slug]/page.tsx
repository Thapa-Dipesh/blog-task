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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.description.replace(/<[^>]*>/g, " ").slice(0, 160),
    image: post.image ? [post.image] : [],
    datePublished: post.createdAt.toISOString(),
    dateModified: (post.updatedAt || post.createdAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author?.name || "KODEX Contributor",
    },
    publisher: {
      "@type": "Organization",
      name: "KODEX.",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.keywords || undefined,
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/#blog-feed`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <SinglePost post={post as any} />
    </>
  );
}