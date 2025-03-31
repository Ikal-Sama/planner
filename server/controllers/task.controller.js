import Task from '../models/tasks.model.js'
import Project from '../models/project.model.js'

export const createTask = async (req, res) => {
    const {id} = req.user
    const {projectId} = req.params;
    const {text} = req.body
    try {
        const project = await Project.findOne({
            _id: projectId,
            userId: id
        });

        if (!project) {
            return res.status(404).json({ message: 'Project not found or access denied' });
        }
        const task = await Task.create({
            text,
            projectId
        })
        if(!task) {
            return res.status(404).json({message: 'Project not found'})
        }
        project.tasks.push(task._id);
        await project.save();
        res.status(201).json(task)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in creating a task'})
    }
}

export const getAllTasks = async(req, res) => {
    const {projectId} = req.params
    try {
        const tasks = await Task.find({
            projectId
        })
        if(!tasks) {
            return res.status(404).json({message: 'Tasks not found'})
        }
        return res.status(200).json(tasks)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in fetching tasks'})
    }
}

export const getTaskById = async(req, res) => {
    const { taskId } = req.params
    const {id: userId} = req.user
    try {
        const task = await Task.findById(taskId);
        if(!task) {
            return res.status(404).json({success: false, message: 'Task not found'});
        }
        const project = await Project.findOne({
            _id: task.projectId,
            userId: userId
        });

        if(!project) {
            return res.status(403).json({success: false, message: 'Access denied'});
        }
        const {projectId, ...taskData} = task.toObject();

        return res.status(200).json(taskData)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in fetching task'})
    }
}

export const updateTask = async(req, res) => {
    const {taskId} = req.params
    const {id: userId} = req.user
    const {text} = req.body
    try {    
        
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }

        const project = await Project.findOne({
            _id: task.projectId,
            userId: userId
        });
        if (!project) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { text },
            { new: true }
        )
        if (!updatedTask) {
            return res.status(500).json({ success: false, message: 'Failed to update task' });
        }

        return res.status(200).json(updatedTask);
        
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ success: false, message: 'Server error while updating task' });
    }
}

export const deleteTask = async(req, res) => {
    const {taskId} = req.params
    const {id: userId} = req.user
    try {
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }
        const project = await Project.findOne({ _id: task.projectId, userId });
        if (!project) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        await Task.findByIdAndDelete(taskId);
        return res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting task' });
    }
}

export const toggleTaskStatus = async(req, res) => {
    const {taskId} = req.params
    const {id: userId} = req.user
    try {
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }
        const project = await Project.findOne({ _id: task.projectId, userId });
        if (!project) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }
        if(task.completed === true) {
            return res.status(401).json({ success: false, message:"Task already completed" });
        }
        const completedTask = await Task.findByIdAndUpdate(
            taskId,
            { completed: true },
            { new: true }
        )
        return res.status(200).json({success: true, message: "Task completed!"})
    } catch (error) {
        console.error('Error completing task:', error);
        res.status(500).json({ success: false, message: 'Server error while completing task' });
    }
}

export const statusUpdate = async(req, res) => {
    const {taskId} = req.params
    const {id: userId} = req.user
    try {
        const task = await Task.findById(taskId)
        if(!task){
            return res.status(404).json({success: false, message: 'Task not found'});
        }
        const project = await Project.findOne({ _id: task.projectId, userId });
        if (!project) {
            return res.status(403).json({ success: false, message: 'Access denied' });
        }

        task.status = status;
        await task.save();

        // 5. Return the updated task
        res.status(200).json({ 
            success: true, 
            message: 'Task status updated successfully',
            task 
        });
    } catch (error) {
         console.error('Error completing task:', error);
        res.status(500).json({ success: false, message: 'Server error while updating status in task' });
    }
}