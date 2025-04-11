import { addActivitySchema, editActivitySchema } from "@/schemas";
import { z } from "zod";
import { axiosInstance } from "./auth";


export const createActivity = async(values: z.infer<typeof addActivitySchema>) => {
    try {
        // Validate input data
        const validatedValues = addActivitySchema.parse(values);

        // Send request to backend API
        const response = await axiosInstance.post("/activities", validatedValues);
        
        return response.data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            return { error: error.errors.map((err) => err.message).join(", ") };
        }
        
        console.error("API Error:", error);
        return { error: "Failed to create activity. Please try again." };
    }
}

export const getAllAcitivy = async() => {
    try {
        const response = await axiosInstance.get('/activities/all');
        return response.data
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            return { error: error.errors.map((err) => err.message).join(", ") };
        }
        
        console.error("API Error:", error);
        return { error: "Failed to fetch activities. Please try again." };
    }
}

export const getUsersActivities = async() => {
    try {
        const response = await axiosInstance.get("/activities");
        return response.data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            return { error: error.errors.map((err) => err.message).join(", ") };
        }
        
        console.error("API Error:", error);
        return { error: "Failed to fetch activities. Please try again." };
    }
}

export const getActivityById = async(id: string) => {
    try {
        const response = await axiosInstance.get(`/activities/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            return { error: error.errors.map((err) => err.message).join(", ") };
        }
        console.error("API Error:", error);
        return { error: "Failed to fetch activity. Please try again." };
    }
}

export const updateActivity = async(id: string, values: z.infer<typeof editActivitySchema>) => {
    try {
        const validatedValues = editActivitySchema.parse(values);
        
        const {title, description, scheduledDate} = validatedValues
        if(!title || !description || !scheduledDate) {
            return { error: "All fields are required" };
        }

        const response = await axiosInstance.put(`/activities/${id}`, {
            title,
            description,
            scheduledDate
        });

        return response.data
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            return { error: error.errors.map((err) => err.message).join(", ") };
        }
        console.error("API Error:", error);
        return { error: "Failed to update activity. Please try again." };
    }
}



export const deleteActivity = async(id: string) => {
    try {
        const response = await axiosInstance.delete(`/activities/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
            return { error: error.errors.map((err) => err.message).join(", ") };
        }
        console.error("API Error:", error);
        return { error: "Failed to delete activity. Please try again." };
    }
}