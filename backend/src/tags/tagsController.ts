import { NextFunction, Request, Response } from "express";
import { Tag } from "./tagsModal";
import createHttpError from "http-errors";
import { Blog } from "../blogs/blogModal";

export const postByTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tagname = req.params.tagName;

        // Find tags with the specified tag name
        const tags = await Tag.find({ tag: tagname });
        if (!tags || tags.length === 0) {
            const error = createHttpError(404, "Tag not found");
            return next(error);
        }

        // Extract tag IDs from the found tags
        const tagIds = tags.map(tag => tag._id);

        // Find blogs that have any of the extracted tag IDs in their tags array
        const blogs = await Blog.find({ tags: { $in: tagIds } });
        if (!blogs || blogs.length === 0) {
            const error = createHttpError(404, "No blogs found for this tag");
            return next(error);
        }

        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};
