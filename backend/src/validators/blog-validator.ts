import {z} from 'zod'

export const blogSchema = z.object({
    title: z.string({required_error: "Title is required"}).min(1).max(200),
    subTitle: z.string({required_error: "subtitle is required"}),
    tags: z.array(z.string()),
    content: z.string({required_error: "Content is required"}).min(300, {message: "Content should be larger than 300"})
})