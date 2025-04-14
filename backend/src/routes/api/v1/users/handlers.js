import { prisma } from "../../../../adapters.js";
export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}
export async function createOneUser(req, res) {
  try {
    const user = await prisma.user.create({
      data: { name: req.body.name },
    });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    console.log("body", req.body);
    return res.status(500).json({ error: "Failed to create user." });
  }
}

export async function getOneUser(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
  const user = await prisma.user.findUnique({ where: { id } });
  if (user == null) return res.status(404).json({ error: "Not found" });
  return res.json(user);
}
