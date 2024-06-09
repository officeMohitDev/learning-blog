import express from "express";
import { getUserDetails, loginUser, registerUser } from "./userController";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/details/:username", getUserDetails)

export default userRouter;
