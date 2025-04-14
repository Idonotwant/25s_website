import { prisma } from "../../../../adapters.js";
import bcrypt from "bcrypt";
import multer from "multer";
import { fileTypeFromBuffer } from "file-type";
const upload = multer({ storage: multer.memoryStorage() });
async function hashPassword(plainTextPassword) {
  const saltRounds = 10;
  return await bcrypt.hash(plainTextPassword, saltRounds);
}

export async function createOneUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { username: username, password: hashedPassword },
    });
    console.log("user created:", user.username);
    return res.status(201);
  } catch (error) {
    console.error("Error creating user:", error);
    console.log("body", req.body);
    return res.status(500).json({ error: "Failed to create user." });
  }
}

export async function updateOneUser(req, res) {
  try {
    const id = req.session.userId;
    if (typeof id !== "string") {
      console.error("User not logged in");
      return res.status(400).json({ error: "Please login first" });
    }
    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }
    const { originalname, mimetype, buffer } = req.file;
    const user = await prisma.user.update({
      where: { id },
      data: { picture: buffer },
    });
    console.log("User updated:", user.username);
    return res.json({
      message: "File uploaded successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Failed to update user." });
  }
}

export async function getOneUser(req, res) {
  console.log("getOneUser");

  try {
    const id = req.session.userId;
    if (typeof id !== "string") {
      console.error("User not logged in");
      return res.status(400).json({ error: "Please login first" });
    }
    const user = await prisma.user.findUnique({
      where: { id },
      select: { picture: true },
    });
    if (!user || !user.picture) {
      return res.status(404).json({ error: "Picture not found" });
    }
    const raw = user.picture;
    const buffer = Buffer.from(raw, "hex");
    const typeInfo = await fileTypeFromBuffer(buffer);
    res.set("Content-Type", typeInfo?.mime || "image/png");
    res.send(buffer);
  } catch (error) {
    console.error("Error getting user picture:", error);
    return res.status(500).json({ error: "Failed to get user picture." });
  }
}
