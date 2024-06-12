import express from "express";
import { getUserDetails, loginUser, profileMe, registerUser, updateUserDetails } from "./userController";
import multer from "multer";
import path from "node:path";

const userRouter = express.Router();

const upload = multer({
    dest: path.resolve(__dirname, "../../public/data/uploads"),
    limits: {fileSize: 10 * 1024 * 1024}
})

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/details/:username", getUserDetails)
userRouter.post("/profile", profileMe)
userRouter.patch("/following/:userId", )
userRouter.post("/update", upload.fields([
    {name: "userPfp", maxCount: 1}
]) , updateUserDetails)

export default userRouter;
