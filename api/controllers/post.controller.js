import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

    // setTimeout(() => {
    res.status(200).json(posts);
    // }, 3000);someControllerFunction
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  // Validate ObjectID
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid Post ID" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const token = req.cookies?.token;

    if (token) {
      return jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(200).json({ ...post, isSaved: false });
        }

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      });
    }

    // Send response if no token is present
    return res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.error("Error in getPost:", err);
    return res.status(500).json({ message: "Failed to get post", error: err.message });
  }
};
export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId; // Ensure this is set correctly from middleware

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId, // Associate the post with the logged-in user
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    // Send the response and stop further execution
    return res.status(200).json(newPost);
  } catch (err) {
    console.error(err);

    // Check if headers have already been sent before sending an error response
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to create post" });
    }
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
