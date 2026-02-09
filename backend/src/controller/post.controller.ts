import { Request, Response } from "express";
import { prisma } from "../config/db.config.js";

export const createPost = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      slug,
      metaTitle,
      metaDescription,
      keywords,
      image,
    } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    if (!title || !description || !slug) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        description,
        slug,
        image: imageUrl,
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

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

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
    const { id } = req.params;
    const { title, description, slug, metaTitle, metaDescription, keywords } =
      req.body;

    const post = await prisma.blogPost.update({
      where: {
        id: Number(id),
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
        id: Number(id),
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
