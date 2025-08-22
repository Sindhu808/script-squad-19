import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { prisma } from '../config/prisma.js';
import { z } from 'zod';

dotenv.config();

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function register(req, res, next) {
  try {
    const parsed = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: { name: parsed.name, email: parsed.email, password: hashed },
      select: { id: true, name: true, email: true, bio: true, createdAt: true }
    });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ user, token });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const parsed = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(parsed.password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const safeUser = { id: user.id, name: user.name, email: user.email, bio: user.bio, createdAt: user.createdAt };
    res.json({ user: safeUser, token });
  } catch (err) {
    if (err.name === 'ZodError') return res.status(400).json({ message: err.errors });
    next(err);
  }
}
