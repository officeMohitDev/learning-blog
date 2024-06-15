import { NextFunction, Request, Response } from "express";
import getUserIdFromAuthorizationHeader from "../utils/token";
import { Comment } from "./commentModal";
import { Blog } from "../blogs/blogModal";
import createHttpError from "http-errors";
import { populate } from "dotenv";
import { cp } from "fs";

export const CreateComment = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const blogId = req.params.blogId;
        const { commentMsg, pinned, isNested, topCommentId } = req.body
        const commentor = getUserIdFromAuthorizationHeader(req);

        if (!commentMsg) {
            const error = createHttpError(400, "Bad request")
            return next(error)
        }

        let blog = await Blog.findById(blogId);

        if (!blog) {
            const error = createHttpError(404, "Blog not found");
            return next(error)
        }

        const comment = await Comment.create({
            comment: commentMsg,
            isNested,
            commentor,
            pinned,
            topCommentId,
            blogId,
        }).then(async (response) => {
            blog.comments.push(response._id)
            await blog.save();

        })
        const blogs = await Blog.findById(blogId).populate("author").populate("likes").populate("tags").populate({
            path: 'comments',
            populate: {
                path: 'commentor', // Populate the commentor field in each comment
                model: 'User', // Assuming 'User' is the name of your User model
                select: 'username name image'
            }
        });

        res.status(201).json({ blog: blogs })

    } catch (error) {
        next(error)
    }
}


export const allComments = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const blogid = req.params.blogId
        const comments = await Comment.find({ blogId: blogid }).populate("commentor");

        if (!comments.length) {
            const error = createHttpError(404, "Comments not found");
            return next(error)
        }
        res.status(200).json(comments)

    } catch (error) {
        next(error)
    }
}