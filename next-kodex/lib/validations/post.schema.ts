import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  description: z.string().trim().min(5, "Content/description must be at least 5 characters"),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  keywords: z.string().trim().optional(),
});

export const updatePostSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  description: z.string().trim().min(5, "Content/description must be at least 5 characters"),
  metaTitle: z.string().trim().optional(),
  metaDescription: z.string().trim().optional(),
  keywords: z.string().trim().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
