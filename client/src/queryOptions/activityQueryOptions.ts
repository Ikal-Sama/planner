import { getUsersActivities } from '@/actions/activity'
import {queryOptions} from '@tanstack/react-query'

export const activityQueryOptions = () => {
    return queryOptions({
        queryKey: ['activities'], // More specific key
        queryFn:  getUsersActivities
    })
}