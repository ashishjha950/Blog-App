import express from 'express'
import { deletePost, getAllPosts, getMyPosts, updateblog, uploadPost } from '../controller/blog.js'
import upload from '../middlewares/blogimageupload.js'
import authenticateUser from '../middlewares/authenticateUser.js'
const router = express.Router()

router.get('/myblog',authenticateUser,getMyPosts)
router.delete('/myblog/:postId',authenticateUser,deletePost)
router.get('/allblog',getAllPosts)
router.post('/postblog',authenticateUser,upload.single('postImg'),uploadPost)
router.patch('/updateblog/:postId',authenticateUser,upload.single('postImg'),updateblog)

export default router;