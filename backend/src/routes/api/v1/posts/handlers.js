import { prisma } from "../../../../adapters.js";

export async function createPost(req, res) {
  try {
    const id = req.session.userId;
    if (typeof id !== "string") {
      return res.status(401).json({ error: "Login to post" });
    }

    const { title, content } = req.body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        user: {
          connect: {
            id: id,
          },
        },
      },
      include: { user: true },
    });
    console.log("post created:", newPost.user.username);
    return res.status(201).json({});
  } catch (error) {
    console.error("Error creating post:", error);
    console.log("body", req.body);
    return res.status(500).json({ error: "Failed to create post." });
  }
}

export async function getALLPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Failed to fetch posts." });
  }
}
