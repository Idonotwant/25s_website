import { prisma } from "../../../../adapters.js";
import bcrypt from "bcrypt";
async function verifyPassword(plainTextPassword, hashedPassword) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
}
export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return res.status(401).json({ error: "Cannot find user" });
    }
    if (!(await verifyPassword(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      req.session.userId = user.id;
      console.log("User logged in:", user.username);
      return res
        .status(200)
        .json({ message: "Login successful", username: user.username });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
