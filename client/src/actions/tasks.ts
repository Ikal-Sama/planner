import { addTaskSchema, editTaskSchema } from "@/schemas";
import { axiosInstance } from "./auth"
import { z } from "zod";
import axios from "axios";

export const getProjectTasks = async(projectId: string) => {
    try {
        const response = await axiosInstance.get(`/tasks/${projectId}`)
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error fetching tasks", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}


export const addTask = async(values: z.infer<typeof addTaskSchema>, projectId: string) => {
    try {
         const validatedData = addTaskSchema.parse(values)
            const {text} = validatedData
            if(!text) {
                return {success: false, error: "All fields are required"}
            }
        const response = await axiosInstance.post(`/tasks/${projectId}`,{
            text
        })
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error creating task", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}


export const toggleCompleteTask = async(taskId: string) => {
    try {
        const response = await axiosInstance.put(`/tasks/completed/${taskId}`)
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error creating task", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}

type Task = {
    _id: string,
    text: string,
    completed: boolean,
}


export const getTaskById = async (taskId: string): Promise<Task> => {
    try {
        const response = await axiosInstance.get(`/tasks/task/${taskId}`)
        return response.data
    } catch (error) {
        console.error("Error fetching task", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}


export const editTask =  async(taskId: string, values: z.infer<typeof editTaskSchema>) => {
    try {
        const validatedData = editTaskSchema.parse(values)
            const {text} = validatedData
            if(!text) {
                return {success: false, error: "All fields are required"}
            }

        const response = await axiosInstance.put(`/tasks/${taskId}`, {
            text
        })
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error updating task", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}

export const deleteTask = async(taskId: string) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`)
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error deleting task", error)
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}

export const statusUpdate = async(taskId: string) => {
    try {
        const response = await axiosInstance.put(`/tasks/status/${taskId}`)
        return {success: true, data: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        // Handle non-Axios errors
        throw new Error('An unexpected error occurred');
    }
}