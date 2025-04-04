import express from 'express';
import authenticateUser from '../middlewares/authenticateUser.js';
import { postComment } from '../controller/comment.js';
const router = express.Router()

router.post('/post/:postId',authenticateUser,postComment)

export default router;