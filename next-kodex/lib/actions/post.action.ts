"use server";

import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { createPostSchema, updatePostSchema } from "@/lib/validations/post.schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const user = await requireAuth();

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    description: formData.get("description") as string,
    metaTitle: (formData.get("metaTitle") as string) || undefined,
    metaDescription: (formData.get("metaDescription") as string) || undefined,
    keywords: (formData.get("keywords") as string) || undefined,
  };

  const validation = createPostSchema.safeParse(rawData);
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Validation failed");
  }

  const { title, slug, description, metaTitle, metaDescription, keywords } = validation.data;

  // Handle unique slug if duplicate exists
  let finalSlug = slug;
  const count = await prisma.blogPost.count({
    where: {
      slug: {
        startsWith: slug,
      },
    },
  });

  if (count > 0) {
    finalSlug = `${slug}-${count + 1}`;
  }

  const imageFile = formData.get("image") as File | null;
  const imageUrl = await uploadImageToCloudinary(imageFile);

  await prisma.blogPost.create({
    data: {
      title,
      slug: finalSlug,
      description,
      image: imageUrl,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      keywords: keywords || null,
      authorId: user.id,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function updatePost(idOrSlug: string, formData: FormData) {
  const user = await requireAuth();

  // Find existing post either by id or by slug
  const existingPost = await prisma.blogPost.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
  });

  if (!existingPost) {
    throw new Error("Post not found");
  }

  // Verify ownership or ADMIN role
  if (existingPost.authorId !== user.id && user.role !== "ADMIN") {
    throw new Error("Unauthorized to modify this post");
  }

  const rawData = {
    title: formData.get("title") as string,
    slug: (formData.get("slug") as string)?.toLowerCase().replace(/\s+/g, "-"),
    description: formData.get("description") as string,
    metaTitle: (formData.get("metaTitle") as string) || undefined,
    metaDescription: (formData.get("metaDescription") as string) || undefined,
    keywords: (formData.get("keywords") as string) || undefined,
  };

  const validation = updatePostSchema.safeParse(rawData);
  if (!validation.success) {
    throw new Error(validation.error.issues[0]?.message || "Validation failed");
  }

  const { title, slug, description, metaTitle, metaDescription, keywords } = validation.data;

  let imageUrl = existingPost.image;
  const imageFile = formData.get("image") as File | null;
  if (imageFile && imageFile.size > 0) {
    imageUrl = await uploadImageToCloudinary(imageFile, existingPost.image);
  }

  await prisma.blogPost.update({
    where: { id: existingPost.id },
    data: {
      title,
      slug,
      description,
      image: imageUrl,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      keywords: keywords || null,
    },
  });

  revalidatePath("/");
  revalidatePath(`/blog/${slug}`);
  revalidatePath(`/blog/${existingPost.slug}`);
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/blogs");
  redirect("/admin/blogs");
}

export async function deletePost(id: string) {
  const user = await requireAuth();

  const post = await prisma.blogPost.findUnique({
    where: { id },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.authorId !== user.id && user.role !== "ADMIN") {
    throw new Error("Unauthorized to delete this post");
  }

  await prisma.blogPost.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/blogs");
}
