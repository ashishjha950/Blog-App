import express from 'express'
import { getMyPosts, uploadPost } from '../controller/blog.js'
import upload from '../middlewares/blogimageupload.js'
import authenticateUser from '../middlewares/authenticateUser.js'
const router = express.Router()

router.get('/myblog',getMyPosts)
router.post('/postblog',authenticateUser,upload.single('postImg'),uploadPost)

export default router
