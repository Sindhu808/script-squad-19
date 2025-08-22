import { Router } from 'express';
import { me, updateProfile } from '../controllers/user.controller.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();
router.get('/me', authRequired, me);
router.put('/me', authRequired, updateProfile);

export default router;
