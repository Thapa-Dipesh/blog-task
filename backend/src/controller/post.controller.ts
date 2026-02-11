import { Request, Response } from "express";
import { prisma } from "../config/db.config.js";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, description, slug, metaTitle, metaDescription, keywords } =
      req.body;

    const imageUrl = req.file ? req.file.path : null;

    if (!title || !description || !slug) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let finalSlug = slug;
    const count = await prisma.blogPost.count({
      where: { slug: { startsWith: slug } },
    });

    if (count > 0) {
      finalSlug = `${slug}-${count + 1}`; // Turns "my-post" into "my-post-1"
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        description,
        slug: finalSlug,
        image: imageUrl || "default-image.jpg",
        metaTitle,
        metaDescription,
        keywords,
        authorId: req.user.id,
      },
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const posts = await prisma.blogPost.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      posts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: {
        slug: slug as string,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    return res.status(200).json({
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { slug:oldSlug } = req.params;
    const { title, description, slug, metaTitle, metaDescription, keywords } =
      req.body;

    const post = await prisma.blogPost.update({
      where: {
        slug: oldSlug as string,
      },
      data: {
        title,
        description,
        slug,
        metaTitle,
        metaDescription,
        keywords,
      },
    });

    return res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.delete({
      where: {
        id: id as string,
      },
    });

    return res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
