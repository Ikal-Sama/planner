import mongoose from "mongoose";


const TasksSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        index: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    position: {
        type: Number,
        default: 0
    }
    
}, {
    timestamps: true
})

const Task = mongoose.model("Task", TasksSchema)
export default Task