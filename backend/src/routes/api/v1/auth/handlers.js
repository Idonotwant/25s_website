import { prisma } from "../../../../adapters.js";
export async function login(req, res) {
  const { id } = req.body;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  req.session.userId = user.id;
  return res.json({ user: user, id: req.session.userId });
}
