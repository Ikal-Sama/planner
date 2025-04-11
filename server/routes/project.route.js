import express from 'express'
import { protectRoute } from '../utils/verifyToken.js'
import { 
    createProject, 
    deleteProject, 
    getAllProjects, 
    getProjectById, 
    getProjects, 
    updateProject 
} from '../controllers/project.controller.js'

const router = express.Router()

router.post('/', protectRoute, createProject)
router.get('/', protectRoute, getProjects)
router.get('/all', protectRoute, getAllProjects)

router.route("/:id")
    .put(protectRoute, updateProject)
    .delete(protectRoute, deleteProject)
    .get(protectRoute, getProjectById)

export default router