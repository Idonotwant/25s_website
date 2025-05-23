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

export async function deletePost(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post || post.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await prisma.post.delete({
      where: { id: postId },
    });
    console.log("Post deleted:", postId);
    console.log("userId", userId);
    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ error: "Failed to delete post." });
  }
}

export async function updatePost(req, res) {
  try {
    const postId = parseInt(req.params.postId, 10);
    const userId = req.session.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });
    if (!post || post.userId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
    console.log("Post updated:", updatedPost.id);
    console.log("userId", userId);
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ error: "Failed to update post." });
  }
}
