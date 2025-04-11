import express from 'express'
import { protectRoute } from '../utils/verifyToken.js'
import { createActivity, deleteActivity, getActivityById, getAllActivities, getUserActivities, updateActivity } from '../controllers/activity.controller.js'

const router = express.Router()

router.post('/', protectRoute, createActivity)
router.get("/", protectRoute, getUserActivities);
router.get("/all", protectRoute, getAllActivities);
router.get("/:id", protectRoute, getActivityById);
router.put("/:id", protectRoute, updateActivity);
router.delete("/:id", protectRoute, deleteActivity);


export default router