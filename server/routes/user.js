import express from 'express'
import { createUsers, loginUsers } from '../controller/user.js'
const router = express.Router()

router.post('/login',loginUsers)
router.post('/signUp',createUsers)

export default router