import express from "express";
import {
  createPost,
  deletePost,
  getPostBySlug,
  getPosts,
  getUserPosts,
  updatePost,
} from "../controller/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../config/cloudinary.config.js";

const router = express.Router();

router.post("/create", authenticate, upload.single("image"), createPost);
router.get("/my-posts", authenticate, getUserPosts);
router.get("/posts", getPosts);
router.get("/posts/:slug", getPostBySlug);
router.put("/posts/:slug", authenticate, upload.single("image"), updatePost);
router.delete("/posts/:id", authenticate, deletePost);

export default router;
