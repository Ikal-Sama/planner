import { getUser } from '@/actions/auth'
import {queryOptions} from '@tanstack/react-query'

export const authQueryOptions = () => {
    return queryOptions({
        queryKey: ['auth'], // More specific key
        queryFn: getUser,
        staleTime: 0
    })
}