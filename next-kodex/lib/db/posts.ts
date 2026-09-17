import { prisma } from "@/lib/prisma";

export interface PaginationOptions {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}

export async function getAllPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPaginatedPosts(options: PaginationOptions = {}) {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Number(options.limit) || 6);
  const search = options.search?.trim() || "";
  const tag = options.tag?.trim() || "";

  try {
    const whereConditions: any = {};

    if (search) {
      whereConditions.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { keywords: { contains: search, mode: "insensitive" } },
      ];
    }

    if (tag && tag.toLowerCase() !== "all") {
      whereConditions.keywords = {
        contains: tag,
        mode: "insensitive",
      };
    }

    const total = await prisma.blogPost.count({
      where: whereConditions,
    });

    const totalPages = Math.ceil(total / limit) || 1;
    const validPage = Math.min(page, Math.max(1, totalPages));

    const posts = await prisma.blogPost.findMany({
      where: whereConditions,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (validPage - 1) * limit,
      take: limit,
    });

    return {
      posts,
      pagination: {
        total,
        page: validPage,
        limit,
        totalPages,
        hasNext: validPage < totalPages,
        hasPrev: validPage > 1,
      },
    };
  } catch (error) {
    console.error("Error in getPaginatedPosts:", error);
    return {
      posts: [],
      pagination: {
        total: 0,
        page: 1,
        limit,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}

export async function getAllTags(): Promise<string[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        keywords: true,
      },
    });

    const tagSet = new Set<string>();
    for (const post of posts) {
      if (post.keywords) {
        const tags = post.keywords.split(",");
        for (const t of tags) {
          const trimmed = t.trim();
          if (trimmed.length > 1) {
            tagSet.add(trimmed);
          }
        }
      }
    }

    return Array.from(tagSet);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error(`Error fetching post by slug (${slug}):`, error);
    return null;
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error(`Error fetching post by id (${id}):`, error);
    return null;
  }
}

export async function getUserPosts(authorId: string) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  } catch (error) {
    console.error(`Error fetching posts for user (${authorId}):`, error);
    return [];
  }
}

export async function getTagsWithCounts(): Promise<{ tag: string; count: number }[]> {
  try {
    const posts = await prisma.blogPost.findMany({
      select: {
        keywords: true,
      },
    });

    const tagMap = new Map<string, number>();
    for (const post of posts) {
      if (post.keywords) {
        const tags = post.keywords.split(",");
        for (const t of tags) {
          const trimmed = t.trim().toLowerCase();
          if (trimmed.length > 1) {
            tagMap.set(trimmed, (tagMap.get(trimmed) || 0) + 1);
          }
        }
      }
    }

    return Array.from(tagMap.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("Error fetching tags with counts:", error);
    return [];
  }
}

export async function getPostsByTag(tag: string, page = 1, limit = 6) {
  try {
    const cleanTag = tag.trim().toLowerCase();
    const whereConditions = {
      keywords: {
        contains: cleanTag,
        mode: "insensitive" as const,
      },
    };

    const total = await prisma.blogPost.count({
      where: whereConditions,
    });

    const totalPages = Math.ceil(total / limit) || 1;
    const validPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

    const posts = await prisma.blogPost.findMany({
      where: whereConditions,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (validPage - 1) * limit,
      take: limit,
    });

    return {
      posts,
      pagination: {
        total,
        page: validPage,
        limit,
        totalPages,
        hasNext: validPage < totalPages,
        hasPrev: validPage > 1,
      },
    };
  } catch (error) {
    console.error(`Error fetching posts by tag (${tag}):`, error);
    return {
      posts: [],
      pagination: {
        total: 0,
        page: 1,
        limit,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      },
    };
  }
}

export async function searchPostsForPalette(query: string) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: trimmed, mode: "insensitive" } },
          { description: { contains: trimmed, mode: "insensitive" } },
          { keywords: { contains: trimmed, mode: "insensitive" } },
          {
            author: {
              name: { contains: trimmed, mode: "insensitive" },
            },
          },
        ],
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        keywords: true,
        image: true,
        createdAt: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    return posts;
  } catch (error) {
    console.error("Error in searchPostsForPalette:", error);
    return [];
  }
}

export async function getDashboardStats(authorId?: string) {
  try {
    const whereClause = authorId ? { authorId } : {};
    const totalPosts = await prisma.blogPost.count({ where: whereClause });
    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return {
      totalPosts,
      publishedPosts: totalPosts,
      draftPosts: 0,
      totalViews: Math.max(totalPosts * 142, 10),
      posts,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      totalViews: 0,
      posts: [],
    };
  }
}
