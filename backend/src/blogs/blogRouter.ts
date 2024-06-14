import express from 'express'
import { allBlogs, createBlog, likeOrUnlikeBlog, singleBlog } from './blogController';
import { verifyToken } from '../middleware/verifyToken';
import multer from 'multer'
import path from 'node:path';

const blogRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: { fileSize: 10 * 1024 * 1024 }
})

blogRouter.post("/create", upload.fields([
    { name: 'posterImg', maxCount: 1 },
]), createBlog);

blogRouter.get("/all", allBlogs)
blogRouter.get("/:blogId", singleBlog)
blogRouter.patch("/like/:blogId", likeOrUnlikeBlog)

export default blogRouter