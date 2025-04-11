import { getActivityById, getUsersActivities } from '@/actions/activity'
import {queryOptions} from '@tanstack/react-query'

export const activityQueryOptions = () => {
    return queryOptions({
        queryKey: ['activities'], // More specific key
        queryFn:  getUsersActivities
    })
}

export const getActivityByIdQueryOptions = (id: string) => {
    return queryOptions({
        queryKey: ['activities', id], // More specific key
        queryFn: async() => getActivityById(id)
    })
}