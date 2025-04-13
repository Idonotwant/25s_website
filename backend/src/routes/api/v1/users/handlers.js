import { prisma } from "../../../../adapters.js";
export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}
