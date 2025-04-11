import { getAllProjects, getProjectById, getUserProject } from '@/actions/projects'
import { getTaskById } from '@/actions/tasks'
import {queryOptions} from '@tanstack/react-query'

export const projectQueryOptions = () => {
    return queryOptions({
        queryKey: ['projects'], // More specific key
        queryFn: getUserProject,
        staleTime: 0
    })
}

export const getAllProjectsOptions = () => {
    return queryOptions({
        queryKey: ["projects"],
        queryFn: getAllProjects
    })
}

export const getProjectByIdOptions = (projectId: string) => {
    return queryOptions({
        queryKey: ['projects', projectId], // More specific key
        queryFn: async() => {
            const data = await getProjectById(projectId)
            return data
        },
    })
}

export const getTaskByIdOptions = (taskId: string) => {
    return queryOptions({
        queryKey: ["tasks", taskId],
        queryFn: async() => {
            const data = await getTaskById(taskId)
            return data
        },
    })
}