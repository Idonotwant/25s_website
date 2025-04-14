import { Router } from "express";
import { getUserPicture } from "./handlers.js";
const router = Router();

router.get("/:id", getUserPicture);
export default router;
