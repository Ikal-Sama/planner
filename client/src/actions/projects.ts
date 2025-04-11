import axios from "axios";
import { axiosInstance } from "./auth"
import { z } from "zod";
import { addProjectSchema } from "@/schemas";


export const getUserProject = async() => {
    try {
        const response = await axiosInstance.get('/projects')
        return response.data
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

export const addProject = async(values: z.infer<typeof addProjectSchema>) => {
    try {
        const validatedData = addProjectSchema.parse(values)
        const {title, description} = validatedData

        if(!title || !description) {
            return {success: false, error: "All fields are required"}
        }
        const response = await axiosInstance.post('/projects', {
            title,
            description
        })
        return {success: true, data: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific errors
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
          }
          // Handle non-Axios errors
          throw new Error('An unexpected error occurred in creating a project');
    }
}

type Project = {
    _id: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    tasks: Tasks[]
}

type Tasks = 
    {
        _id: string,
        text: string,
        description: string,
        completed: boolean,
        createdAt: string,
        updatedAt: string
    }


    export const getAllProjects = async() => {
        try {
            const response = await axiosInstance.get('/projects/all')
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || error.message;
                throw new Error(`API Error: ${message}`);
            }
            throw new Error('An unexpected error occurred while fetching projects');
        }
    }

export const getProjectById = async (projectId: string): Promise<Project> => {
    try {
        const response = await axiosInstance.get(`/projects/${projectId}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message;
            throw new Error(`API Error: ${message}`);
        }
        throw new Error('An unexpected error occurred while fetching the project');
    }
};

export const updateProject = async (projectId: string, values: z.infer<typeof addProjectSchema>) => {
    try {
        const validatedData = addProjectSchema.parse(values)
        const {title, description} = validatedData

        if(!title || !description) {
            return {success: false, error: "All fields are required"}
        }
        const response = await axiosInstance.put(`/projects/${projectId}`, {
            title,
            description
        })
        return {success: true, data: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message;
            throw new Error(`${message}`);
        }
        throw new Error('An unexpected error occurred while updating the project');
    }
}


export const deleteProject = async(projectId: string) => {
    try {
        const response = await axiosInstance.delete(`/projects/${projectId}`)
        return {success: true, data: response.data}
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || error.message;
            throw new Error(`${message}`);
        }
        throw new Error('An unexpected error occurred while deleting the project');
    }
}