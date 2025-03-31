import Activity from "../models/activities.model.js";

export const createActivity = async(req, res) => {
    const {id: userId} = req.user
    const {title, description, scheduledDate} = req.body
    try {
        if(!title || !description || !scheduledDate) {
            return res.status(400).json({message: 'Please provide all fields'})
        }

        if (isNaN(Date.parse(scheduledDate))) {
            return res.status(400).json({ message: "Invalid date format" });
        }


        const newActivity = await Activity.create({
            userId,
            title,
            description,
            scheduledDate
        })
        res.status(201).json(newActivity)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Server Error in creating activity'})
    }
}

// Get All Activities for a User
export const getUserActivities = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const activities = await Activity.find({ userId }).sort({ scheduledDate: 1 });
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in fetching activities" });
    }
};

// Get a Single Activity
export const getActivityById = async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findById(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json(activity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in fetching activity" });
    }
};

// Update Activity
export const updateActivity = async (req, res) => {
    const { id } = req.params;
    const { title, description, scheduledDate } = req.body;

    try {
        const activity = await Activity.findById(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }

        activity.title = title || activity.title;
        activity.description = description || activity.description;
        activity.scheduledDate = scheduledDate ? new Date(scheduledDate) : activity.scheduledDate;

        const updatedActivity = await activity.save();
        res.status(200).json(updatedActivity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in updating activity" });
    }
};

// Delete Activity
export const deleteActivity = async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
        }
        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in deleting activity" });
    }
};