import { Router } from "express";
import { login } from "./handlers.js";

const router = Router();
router.post("/login", login);
export default router;
