import { z } from 'zod';

// Define the schema for the socialLinks object
const SocialLinksSchema = z.object({
    github: z.string().optional(),
    linkedin: z.string().optional(),
    medium: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
});

// Define the schema for the formData object
export const userUpdateSchema = z.object({
    username: z.string().optional(),
    name: z.string().optional(),
    image: z.string().optional(), // Assuming image is a string URL or a File instance
    role: z.string().optional(),
    location: z.string().optional(),
    date: z.string().optional(),
    about: z.string().optional(),
    socialLinks: SocialLinksSchema.optional(),
    website: z.string().url().optional(),
});
