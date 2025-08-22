import { prisma } from '../config/prisma.js';
import { z } from 'zod';

const profileSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().max(500).optional(),
});

export async function me(req, res, next) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, bio: true, createdAt: true, updatedAt: true }
    });
    res.json({ user });
  } catch (err) { next(err); }
}

export async function updateProfile(req, res, next) {
  try {
    const parsed = profileSchema.parse(req.body);
    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: parsed,
      select: { id: true, name: true, email: true, bio: true, createdAt: true, updatedAt: true }
    });
    res.json({ user: updated });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}
