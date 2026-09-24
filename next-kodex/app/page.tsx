import { getPaginatedPosts, getAllPosts, getTagsWithCounts, getAllTags } from "@/lib/db/posts";
import { JournalHeroSlider } from "@/components/landing/journal/JournalHeroSlider";
import { CategorySpotlight } from "@/components/landing/journal/CategorySpotlight";
import { PopularNowBar } from "@/components/landing/journal/PopularNowBar";
import { NewsletterCallout } from "@/components/landing/journal/NewsletterCallout";
import { JournalFeed } from "@/components/landing/journal/JournalFeed";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tag?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const search = params?.q || "";
  const tag = params?.tag || "";

  // Parallel database queries for performance
  const [paginatedData, allPosts, tagsWithCounts, allTags] = await Promise.all([
    getPaginatedPosts({
      page,
      limit: 7,
      search,
      tag,
    }),
    getAllPosts(),
    getTagsWithCounts(),
    getAllTags(),
  ]);

  const { posts, pagination } = paginatedData;

  // Hero slider posts (top 4 latest articles)
  const heroPosts = allPosts.slice(0, 4);

  // Popular articles (sorted by title/recency for mock activity)
  const popularPosts = allPosts.slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 1. Cinematic Full-Bleed Editorial Hero Slider (only show on page 1 with no filters) */}
      {!search && !tag && page === 1 && (
        <JournalHeroSlider posts={heroPosts as any} />
      )}

      {/* 2. Visual 3-Column Topic / Category Spotlight */}
      {!search && !tag && page === 1 && (
        <CategorySpotlight tags={tagsWithCounts} />
      )}

      {/* 3. Popular Now Ticker Bar */}
      {!search && !tag && page === 1 && (
        <PopularNowBar posts={popularPosts as any} />
      )}

      {/* 4. Mid-Page Split Newsletter Banner */}
      {!search && !tag && page === 1 && (
        <NewsletterCallout />
      )}

      {/* 5. Magazine 2-Column Feed with Sticky Author & Trending Sidebar */}
      <JournalFeed
        posts={posts}
        popularPosts={popularPosts}
        pagination={pagination}
        search={search}
        tag={tag}
        allTags={allTags}
      />
    </div>
  );
}
