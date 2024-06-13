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

export const createBlog = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let _req = req as AuthRequest;
        const user = getUserIdFromAuthorizationHeader(req);

        const userDB = await User.findOne({_id: user});

        if (!user || !userDB) {
            const error = createHttpError(404, "unauthorize user");
            return next(error)
        }

        const files = req.files as { [fieldName: string]: Express.Multer.File[] };
        console.log(files)
        const coverImageMimeType = files.posterImg[0].mimetype.split("/").at(-1);
        const fileName = files.posterImg[0].filename;
        const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName)

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'blog-posters',
            format: coverImageMimeType
        })

        console.log(uploadResult)

        const {title, subTitle, tags, content} = _req.body;

        const tagIds = await Promise.all(tags.map(async (tagName: any) => {
            let tag = await Tag.findOne({ name: tagName });
            if (!tag) {
              tag = new Tag({ tag: tagName });
              await tag.save();
            }
            return tag._id;
          }));
      
          

// tags:tagIds,
        const blog = await Blog.create({
            title, subTitle, posterImg: uploadResult.secure_url, tags: tagIds, content: content, author: user
        })

        await fs.promises.unlink(filePath)

        res.status(201).json(blog)

    } catch (error:any) {
        console.error(error); // Log the error message
        res.status(500).send('Internal Server Error'); // Send a generic error response
    }
};