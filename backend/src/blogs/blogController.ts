import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

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
        console.log(req.body); 
    } catch (error:any) {
        console.error(error); // Log the error message
        res.status(500).send('Internal Server Error'); // Send a generic error response
    }
};