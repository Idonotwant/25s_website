import { Router } from "express";
import { createPost, getALLPosts, deletePost, updatePost } from "./handlers.js";
const router = Router();

router.post("/", createPost);
router.get("/", getALLPosts);
router.delete("/:postId", deletePost);
router.post("/:postId", updatePost);
export default router;
