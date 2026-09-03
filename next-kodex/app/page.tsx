import { BlogFeed } from "@/components/landing/BlogFeed";
import HeroSection from "@/components/landing/HeroSection";

interface HomePageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tag?: string;
  }>;
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = params?.q || "";
  const tag = params?.tag || "";

  return (
    <div>
      <HeroSection />
      <BlogFeed page={page} search={search} tag={tag} />
    </div>
  );
}
