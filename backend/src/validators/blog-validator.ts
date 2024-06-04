import {z} from 'zod'

export const blogSchema = z.object({
    title: z.string({required_error: "Title is required"}).min(1).max(200),
    subTitle: z.string({required_error: "subtitle is required"}),
    posterImg: z.string({required_error: "poster image is required"}),
    tags: z.array(z.string())
})