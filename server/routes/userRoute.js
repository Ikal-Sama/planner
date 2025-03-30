import express from 'express'
import { checkAuth, loginUser, logout, registerUser } from '../controllers/user.controller.js'
import { protectRoute } from '../utils/verifyToken.js'

const router = express.Router()


router.post("/signin", loginUser)
router.post("/signup", registerUser)
router.post('/signout', logout)

router.get('/check', protectRoute, checkAuth)

export default router