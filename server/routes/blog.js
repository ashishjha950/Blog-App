import express from 'express'
import { getMyPosts } from '../controller/blog.js'
const router = express.Router()

router.get('/myblog',getMyPosts)

export default router
