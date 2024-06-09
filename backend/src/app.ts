import express, { NextFunction } from "express";
import userRouter from "./users/userRoutes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import blogRouter from "./blogs/blogRouter";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser());
// app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send({ msg: "everything is fine" });
});

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.use(globalErrorHandler);

export default app;
