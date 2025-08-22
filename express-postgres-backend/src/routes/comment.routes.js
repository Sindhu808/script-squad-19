import { Router } from 'express';
import { authRequired, ownsResource } from '../middleware/auth.js';
import { addComment, updateComment, deleteComment, getCommentOwnerId } from '../controllers/comment.controller.js';

const router = Router();

router.post('/posts/:postId/comments', authRequired, addComment);
router.put('/comments/:id', authRequired, ownsResource(getCommentOwnerId), updateComment);
router.delete('/comments/:id', authRequired, ownsResource(getCommentOwnerId), deleteComment);

export default router;
