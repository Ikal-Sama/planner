import { signinFormSchema, signupFormSchema } from '@/schemas'
import axios from 'axios'
import { z } from 'zod'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_URL : '/api',
    withCredentials: true
})

 type User = {
    id: string
    name: string
    email: string
    isActive: boolean
}

export const getUser = async(): Promise<User> => {
    try {
        const response = await axiosInstance.get('/users/check')
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

export const signup = async(values: z.infer<typeof signupFormSchema>) => {
    try {
        const validatedData = signupFormSchema.parse(values)
        const {name, email, password} = validatedData

        if(!name || !email || !password) {
            return {success: false, error: "All fields are required"}
        }
        const response = await axiosInstance.post('/users/signup', {
            name,
            email,
            password
        })
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error in signup server", error)
        return {success: false, error: "Error in signup server"}
    }
}

export const signin = async(values: z.infer<typeof signinFormSchema>) => {
    try {
        const validatedData = signinFormSchema.parse(values)
        const {email, password} = validatedData

        if(!email || !password) {
            return {success: false, error: "All fields are required"}
        }
        const response = await axiosInstance.post('/users/signin', {
            email,
            password
        })
        return {success: true, data: response.data}
    } catch (error) {
        console.error("Error in signin server", error)
        return {success: false, error: "Error in signin server"}
    }
}

export const logout = async() => {
    try {
        const res = await axiosInstance.post('/users/signout')
        return {success: true, data: res.data}
    } catch (error) {
        console.error("Error in logout", error)
    }
}