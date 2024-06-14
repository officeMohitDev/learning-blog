import { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import { blogSchema } from "../validators/blog-validator";
import { Blog } from "./blogModal";
import { Tag } from "../tags/tagsModal";
import fs from 'node:fs'
import { User } from "../users/userModal";
import getUserIdFromAuthorizationHeader from "../utils/token";

interface AuthRequest extends Request {
    user: string;
}

export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = getUserIdFromAuthorizationHeader(req);
        const userDB = await User.findOne({ _id: user });

        console.log("user id-===========", user)

        if (!user && !userDB) {
            const error = createHttpError(404, "unauthorized user");
            return next(error);
        }

        // Log request body and files
        console.log("req.body=================", req.body);
        console.log("req.files=================", req.files);

        const files = req.files as { [fieldName: string]: Express.Multer.File[] };
        const coverImage = files.posterImg[0];

        const coverImageMimeType = coverImage.mimetype.split("/").at(-1);
        const fileName = coverImage.filename;
        const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'blog-posters',
            format: coverImageMimeType
        });

        console.log(uploadResult);

        const { title, subTitle, tags, content } = req.body;
        const tagArray = Array.isArray(tags) ? tags : [tags]; // Ensure tags is an array

        const tagIds = await Promise.all(tagArray.map(async (tagName: any) => {
            let tag = await Tag.findOne({ name: tagName });
            if (!tag) {
                tag = new Tag({ tag: tagName });
                await tag.save();
            }
            return tag._id;
        }));

        console.log(tagIds)

        const blog = await Blog.create({
            title,
            subTitle,
            posterImg: uploadResult.secure_url,
            tags: tagIds,
            content: content,
            author: user
        });

        await fs.promises.unlink(filePath);

        res.status(201).json(blog);
    } catch (error: any) {
        console.error(error); // Log the error message
        res.status(500).send('Internal Server Error'); // Send a generic error response
    }
};


export const allBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogs = await Blog.find({}).populate("author").populate("likes").populate("tags");
        if (!blogs) {
            const err = createHttpError(404, "No blogs created");
            return next(err)
        }
        res.status(200).json(blogs)
    } catch (error) {
        next(error)
    }
}