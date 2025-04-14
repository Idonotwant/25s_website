import { Router } from "express";
import multer from "multer";
import { getOneUser, createOneUser, updateOneUser } from "./handlers.js";
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post(`/`, createOneUser);
router.post("/update", upload.single("file"), updateOneUser);
router.get("/", getOneUser);
export default router;
