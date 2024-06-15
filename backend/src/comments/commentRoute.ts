import express from 'express'
import { CreateComment, allComments } from './commentController';

const commentRouter = express.Router();


commentRouter.post("/create/:blogId", CreateComment);
commentRouter.get("/all/:blogId", allComments);


export default commentRouter