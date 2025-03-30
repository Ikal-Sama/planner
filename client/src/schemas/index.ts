import { z } from "zod"

export const signinFormSchema = z.object({
    email: z.string().email("Email is invalid"),
    password: z.string().min(1, "Password is required"),
})


export const signupFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Email is required"),
    password: z.string().min(5, "Password must be at least 5 characters"),
    confirm_password: z.string().min(5, "Confirm password is required"),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
})

export const addProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().max(255, "Description is required"),
})

export const addTaskSchema = z.object({
    text: z.string().min(1, "Task is required"),
})

export const editTaskSchema = z.object({
    text: z.string().min(1, "Task is required"),
})

export const editProjectSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().max(255, "Description is required"),
})