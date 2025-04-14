import { prisma } from "../../../../adapters.js";
import { fileTypeFromBuffer } from "file-type";

export async function getUserPicture(req, res) {
  try {
    const { id } = req.params;
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
