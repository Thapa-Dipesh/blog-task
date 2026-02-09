import express from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { upload } from "../config/cloudinary.config.js";

const router = express.Router();

router.post("/create", authenticate, upload.single("image"), createPost);
router.get("/posts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", authenticate, upload.single("image"), updatePost);
router.delete("/posts/:id", authenticate, deletePost);

export default router;
