import { Router } from "express";
import { talk } from "./handlers.js";

const router = Router();
router.post("/", talk);
export default router;
