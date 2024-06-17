import express from 'express'
import { CreateComment, allComments, deleteComment, likeOrUnlikeComment } from './commentController';

const commentRouter = express.Router();


commentRouter.post("/create/:blogId", CreateComment);
commentRouter.get("/all/:blogId", allComments);
commentRouter.patch("/like/:commentId", likeOrUnlikeComment);
commentRouter.delete("/delete/:commentId", deleteComment);


export default commentRouter