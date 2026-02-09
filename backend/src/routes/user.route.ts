import express from "express";
import {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", authenticate, logoutUser);
router.get("/profile", authenticate, getUser);

export default router;
