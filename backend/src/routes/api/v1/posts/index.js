import { Router } from "express";
import { createPost, getALLPosts } from "./handlers.js";
const router = Router();

router.post("/", createPost);
router.get("/", getALLPosts);
export default router;
