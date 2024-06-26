import { NextFunction, Request, Response } from "express";
import getUserIdFromAuthorizationHeader from "../utils/token";
import { Comment } from "./commentModal";
import { Blog } from "../blogs/blogModal";
import createHttpError from "http-errors";
import { populate } from "dotenv";
import { cp } from "fs";
import mongoose, { ObjectId } from "mongoose";

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


export const likeOrUnlikeComment = async (req: Request,
    res: Response,
    next: NextFunction) => {
    try {
        const commentId = req.params.commentId;
        const userId = getUserIdFromAuthorizationHeader(req)

        if (!mongoose.Types.ObjectId.isValid(commentId)) {
            const error = createHttpError(400, "Invalid comment ID");
            return next(error);
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            const error = createHttpError(404, "Comment not found")
            return next(error)
        }
        const isLiked = comment.likes.some((likeId: mongoose.Types.ObjectId) => likeId.equals(userId));

        let updatedComment;
        let message;

        if (isLiked) {
            updatedComment = await Comment.findByIdAndUpdate(commentId, {
                $pull: { likes: userId }
            }, { new: true })
            message = "comment Unliked";
        } else {
            updatedComment = await Comment.findByIdAndUpdate(commentId, {
                $addToSet: { likes: userId }
            }, { new: true })
            message = "comment Liked";
        }


        res.status(200).json({
            message,
            comment: updatedComment
        })

    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commentId = req.params.commentId;
        const userId: any = getUserIdFromAuthorizationHeader(req);

        if (!mongoose.Types.ObjectId.isValid(commentId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return next(createHttpError(400, "Invalid comment or user ID"));
        }

        const comment: any = await Comment.findById(commentId).populate("blogId");
        if (!comment || !userId) {
            return next(createHttpError(404, "Comment not found"));
        }

        const blogAuthorId = String(comment.blogId.author);
        const commentAuthorId = String(comment.commentor);

        if (userId !== commentAuthorId && userId !== blogAuthorId) {
            return next(createHttpError(403, "You are not authorized"));
        }

        // Fetch the top comment and all nested comments to be deleted
        const commentsToDelete = await Comment.find({
            $or: [
                { _id: commentId },
                { topCommentId: commentId }
            ]
        });

        const commentIdsToDelete = commentsToDelete.map((comment: any) => comment._id);

        // Delete all comments in one operation
        await Comment.deleteMany({ _id: { $in: commentIdsToDelete } });

        // Remove deleted comments from the blog's comments array
        await Blog.findByIdAndUpdate(comment.blogId._id, {
            $pull: { comments: { $in: commentIdsToDelete } }
        });

        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        next(error);
    }
};
