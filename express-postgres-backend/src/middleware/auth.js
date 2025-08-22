import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authRequired(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ message: 'Missing Authorization header' });
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return res.status(401).json({ message: 'Invalid Authorization header' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email }
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

export function ownsResource(getOwnerIdFn) {
  return async (req, res, next) => {
    try {
      const ownerId = await getOwnerIdFn(req);
      if (!ownerId) return res.status(404).json({ message: 'Resource not found' });
      if (ownerId !== req.user.id) return res.status(403).json({ message: 'Forbidden: not your resource' });
      next();
    } catch (err) {
      next(err);
    }
  };
}
