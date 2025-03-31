import express from 'express'
import { protectRoute } from '../utils/verifyToken.js'
import { 
    createTask, 
    deleteTask, 
    getAllTasks, 
    getTaskById, 
    statusUpdate, 
    toggleTaskStatus, 
    updateTask 
} from '../controllers/task.controller.js'

const router = express.Router()


router.post('/:projectId', protectRoute, createTask)
router.get('/:projectId', protectRoute, getAllTasks)
router.get('/task/:taskId', protectRoute, getTaskById)
router.put('/completed/:taskId',protectRoute, toggleTaskStatus)
router.put('/status/:taskId',protectRoute, statusUpdate)


router.route("/:taskId")
    .put(protectRoute, updateTask)
    .delete(protectRoute, deleteTask)

export default router