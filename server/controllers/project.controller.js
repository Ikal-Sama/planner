import Project from '../models/project.model.js'

export const createProject = async(req, res) => {
    const {id} = req.user
    const {title, description} = req.body
    try {
        if(!title || !description) 
            return res.status(400).json({message: 'Please provide title and dscription'})
        const newProject = await Project.create({
            title,
            description,
            userId: id
        })
        if(!newProject)
            return res.status(201).json({message: "Error creating project"})
        res.status(201).json(newProject)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in creating project'})
    }
}

export const getProjects = async(req, res) => {
    const {id} = req.user
    try {
        const projects = await Project.find({
            userId: id
        }).populate('tasks')
        return res.status(200).json(projects)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in fetching all projects'})
    }
}

export const getAllProjects = async(req, res) => {
    try {
        const projects = await Project.find()
        return res.status(200).json(projects)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in fetching all projects'})
    }
}

export const getProjectById = async(req, res) => {
    const {id} = req.params
    try {
        const project = await Project.findById(id).populate('tasks')
        if(!project) {
            return res.status(404).json({message: 'Project not found'})
        }
        res.status(200).json(project)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in fetching project by id'})
    }
}

export const updateProject = async(req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    try {
        const project = await Project.findById(id)
        if(!project) {
            return res.status(404).json({message: 'Project not found'})
        }
        const newProject = await Project.findByIdAndUpdate(project.id,{
            title,
            description
        })
        res.status(200).json(newProject)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in updating project'})
    }
}

export const deleteProject = async(req, res) => {
    const {id} = req.params
    try {
        const project = await Project.findByIdAndDelete(id)
        if(!project) {
            return res.status(404).json({message: 'Project not found'})
        }
        res.status(200).json({message: 'Project deleted successfully'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in deleting project'})
    }
}