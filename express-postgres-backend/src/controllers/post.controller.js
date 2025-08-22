import { prisma } from '../config/prisma.js';
import { z } from 'zod';

const createSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  published: z.boolean().optional()
});

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional()
});

export async function listPosts(req, res, next) {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: { author: { select: { id: true, name: true } }, comments: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ posts });
  } catch (err) { next(err); }
}

export async function getPost(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, name: true } },
        comments: { include: { author: { select: { id: true, name: true } } } }
      }
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ post });
  } catch (err) { next(err); }
}

export async function createPost(req, res, next) {
  try {
    const parsed = createSchema.parse(req.body);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = await prisma.post.create({
      data: { ...parsed, imageUrl, authorId: req.user.id }
    });
    res.status(201).json({ post });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}

export async function updatePost(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const parsed = updateSchema.parse(req.body);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
    const post = await prisma.post.update({
      where: { id },
      data: { ...parsed, ...(imageUrl ? { imageUrl } : {}) }
    });
    res.json({ post });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Post not found' });
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}

export async function deletePost(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await prisma.comment.deleteMany({ where: { postId: id } }); // cascade safety for demo
    await prisma.post.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Post not found' });
    next(err);
  }
}

// Helper used by ownsResource middleware
export async function getPostOwnerId(req) {
  const id = parseInt(req.params.id);
  const post = await prisma.post.findUnique({ where: { id }, select: { authorId: true } });
  return post?.authorId;
}
