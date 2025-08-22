import { prisma } from '../config/prisma.js';
import { z } from 'zod';

const createSchema = z.object({
  body: z.string().min(1),
});

const updateSchema = z.object({
  body: z.string().min(1)
});

export async function addComment(req, res, next) {
  try {
    const postId = parseInt(req.params.postId);
    const parsed = createSchema.parse(req.body);
    const comment = await prisma.comment.create({
      data: { body: parsed.body, postId, authorId: req.user.id },
      include: { author: { select: { id: true, name: true } } }
    });
    res.status(201).json({ comment });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}

export async function updateComment(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const parsed = updateSchema.parse(req.body);
    const comment = await prisma.comment.update({
      where: { id },
      data: { body: parsed.body }
    });
    res.json({ comment });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Comment not found' });
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}

export async function deleteComment(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await prisma.comment.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ message: 'Comment not found' });
    next(err);
  }
}

export async function getCommentOwnerId(req) {
  const id = parseInt(req.params.id);
  const comment = await prisma.comment.findUnique({ where: { id }, select: { authorId: true } });
  return comment?.authorId;
}
