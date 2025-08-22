import { Router } from 'express';
import { authRequired, ownsResource } from '../middleware/auth.js';
import { upload } from '../utils/uploader.js';
import { listPosts, getPost, createPost, updatePost, deletePost, getPostOwnerId } from '../controllers/post.controller.js';

const router = Router();

router.get('/', listPosts);
router.get('/:id', getPost);
router.post('/', authRequired, upload.single('image'), createPost);
router.put('/:id', authRequired, ownsResource(getPostOwnerId), upload.single('image'), updatePost);
router.delete('/:id', authRequired, ownsResource(getPostOwnerId), deletePost);

export default router;
