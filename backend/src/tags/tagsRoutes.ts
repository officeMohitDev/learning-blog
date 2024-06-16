import express from 'express';
import { postByTags } from './tagsController';

const tagsRouter = express.Router();

tagsRouter.get("/:tagName", postByTags)

export default tagsRouter