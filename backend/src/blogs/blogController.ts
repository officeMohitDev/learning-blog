import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import path from "node:path";
import cloudinary from "../config/cloudinary";
import { blogSchema } from "../validators/blog-validator";

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
        const user = _req.user;
        const files = req.files as { [fieldName: string]: Express.Multer.File[] };
        const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);
        const fileName = files.posterImg[0].filename;
        const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName)

        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: 'blog-posters',
            format: coverImageMimeType
        })

        const {title, subTitle, posterImg, tags} = blogSchema.parse(_req.body)

    } catch (error:any) {
        console.error(error); // Log the error message
        res.status(500).send('Internal Server Error'); // Send a generic error response
    }
};