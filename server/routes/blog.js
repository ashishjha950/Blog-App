import express from 'express'
import { getAllPosts, getMyPosts, uploadPost } from '../controller/blog.js'
import upload from '../middlewares/blogimageupload.js'
import authenticateUser from '../middlewares/authenticateUser.js'
const router = express.Router()

router.get('/myblog',authenticateUser,getMyPosts)
router.get('/allblog',getAllPosts)
router.post('/postblog',authenticateUser,upload.single('postImg'),uploadPost)

export default router
