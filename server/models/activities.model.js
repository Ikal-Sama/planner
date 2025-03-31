import mongoose from "mongoose";


const ActivitySchma = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    scheduledDate: { type: Date, required: true }
}, {
    timestamps: true
})

const Activity = mongoose.model("Activity", ActivitySchma)
export default Activity